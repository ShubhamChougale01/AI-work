import firebase_admin
from firebase_admin import credentials
import os

# Get the current directory path
current_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the path to the credentials file
cred_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(current_dir))), 
                        "Backend", "personal-ai-assistant-44418-firebase-adminsdk-fbsvc-2815ce01ca.json")

# Initialize Firebase Admin SDK
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred) 