from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
import jwt
from datetime import datetime, timedelta

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data
            # Check if user already exists
            if User.objects.filter(email=data['email']).exists():
                return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create user
            user = User.objects.create(
                username=data['email'],
                email=data['email'],
                password=make_password(data['password']),
                first_name=data.get('firstName', ''),
                last_name=data.get('lastName', '')
            )

            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': {
                    'email': user.email,
                    'firstName': user.first_name,
                    'lastName': user.last_name
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
            
            user = User.objects.get(email=email)
            
            if not user.check_password(password):
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': {
                    'email': user.email,
                    'firstName': user.first_name,
                    'lastName': user.last_name
                }
            })

        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class RequestPasswordResetView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            email = request.data.get('email')
            if not email:
                return Response(
                    {'error': 'Email is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user = User.objects.filter(email=email).first()
            if not user:
                return Response(
                    {'message': 'If an account exists with this email, a password reset link will be sent.'},
                    status=status.HTTP_200_OK
                )
            
            # Generate reset token
            reset_token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(hours=1)
            }, settings.SECRET_KEY, algorithm='HS256')
            
            # Send reset email
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{reset_token}"
            send_mail(
                'Reset Your Password',
                f'Click the following link to reset your password: {reset_url}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            return Response({
                'message': 'If an account exists with this email, a password reset link will be sent.'
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            token = request.data.get('token')
            new_password = request.data.get('new_password')
            
            if not token or not new_password:
                return Response(
                    {'error': 'Token and new password are required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Verify token
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                user = User.objects.get(id=payload['user_id'])
            except (jwt.ExpiredSignatureError, jwt.DecodeError, User.DoesNotExist):
                return Response(
                    {'error': 'Invalid or expired reset token'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Update password
            user.password = make_password(new_password)
            user.save()
            
            return Response({'message': 'Password has been reset successfully'})
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 