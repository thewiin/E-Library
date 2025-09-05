from flask_jwt_extended import create_access_token
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
            # identity có thể là user.id hoặc dict (id, role,...)
            token = create_access_token(identity=user.jwt_identity())
            return token, user
        return None, None
