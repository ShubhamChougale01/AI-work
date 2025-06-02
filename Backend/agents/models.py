from django.db import models
from django.contrib.auth.models import User

class Memory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.JSONField(default=list)  # Store tags as JSON array

    class Meta:
        ordering = ['-created_at']

class Goal(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

class Reminder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    reminder_time = models.DateTimeField()
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['reminder_time']

class ChatMessage(models.Model):
    AGENT_CHOICES = [
        ('memory', 'Memory Agent'),
        ('goal', 'Goal Tracking Agent'),
        ('reminder', 'Reminder Agent')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    agent_type = models.CharField(max_length=20, choices=AGENT_CHOICES)
    is_user_message = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferences = models.JSONField(default=dict)  # Store user preferences as JSON
    last_active = models.DateTimeField(auto_now=True)
    notification_enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.user.email
