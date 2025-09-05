from flask import Blueprint, request, jsonify
from app.service import user_service
from functools import wraps
from app.models import User
from flask import current_app
import jwt

from app.service.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)

# decorator kiểm tra token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token thiếu'}), 401
        try:
            token = token.split(" ")[1]  # Bearer <token>
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Token không hợp lệ'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = AuthService.register(
        email=data['email'],
        password=data['password'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        dob=data.get('dob'),
        gender=data.get('gender'),
        role=data.get('role')
    )
    return jsonify(user.to_dict()), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    token, _ = AuthService.login(data['email'], data['password'])
    if token:
        return jsonify({'token': token})
    return jsonify({'message': 'Sai email hoặc mật khẩu'}), 401
