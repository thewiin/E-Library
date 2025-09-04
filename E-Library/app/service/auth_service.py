import jwt
from datetime import datetime, timedelta
from flask import current_app
from app.extensions import bcrypt
from app.models import User
from app.repository.user_repository import UserRepository

class AuthService:
    @staticmethod
    def register(email, password, first_name, last_name, dob=None, gender=None, role=None):
        if UserRepository.get_by_email(email):
            raise ValueError("Email đã tồn tại")

        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        user = User(
            email=email,
            password=hashed_pw,
            first_name=first_name,
            last_name=last_name,
            dob=dob,
            gender=gender,
            role=role
        )
        return UserRepository.save(user)

    @staticmethod
    def login(email, password):
        user = UserRepository.get_by_email(email)
        if user and bcrypt.check_password_hash(user.password, password):
            payload = {
                "user_id": user.id,
                "exp": datetime.utcnow() + timedelta(hours=1)
            }
            token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
            return token
        return None
