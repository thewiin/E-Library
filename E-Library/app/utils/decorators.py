from functools import wraps
from flask import request, jsonify, current_app
import jwt
from app.repository.user_repository import UserRepository

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token thiếu"}), 401

        try:
            token = token.split(" ")[1]  # Bearer <token>
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = UserRepository.get_by_id(data["user_id"])
        except Exception as e:
            return jsonify({"message": f"Token không hợp lệ: {str(e)}"}), 401

        return f(current_user, *args, **kwargs)
    return decorated
