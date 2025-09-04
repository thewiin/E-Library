from app.models import User
from app.extensions import db, bcrypt
from flask import current_app
import jwt, datetime

class AuthService:
    @staticmethod
    def register(email, password, first_name, last_name, dob=None, gender=None, role=None):
        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(
            email=email,
            password=hashed_pw,
            first_name=first_name,
            last_name=last_name,
            dob=dob,
            gender=gender,
            role=role
        )
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def login(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, current_app.config['SECRET_KEY'], algorithm='HS256')
            return token
        return None
