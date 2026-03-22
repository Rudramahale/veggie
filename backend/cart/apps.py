import os
from django.apps import AppConfig
from django.conf import settings
import firebase_admin
from firebase_admin import credentials

class CartConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "cart"

    def ready(self):
        try:
            private_key_path = os.path.join(settings.BASE_DIR, 'firebase_backend_privatekey.json')
            if os.path.exists(private_key_path) and not firebase_admin._apps:
                cred = credentials.Certificate(private_key_path)
                firebase_admin.initialize_app(cred)
        except Exception as e:
            print(f"Error initializing Firebase Admin: {e}")
