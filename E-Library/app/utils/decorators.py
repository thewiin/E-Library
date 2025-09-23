from functools import wraps

from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.repository.user_repository import UserRepository


def token_required(f):
    @wraps(f)
    @jwt_required()
    def decorated(*args, **kwargs):
        try:
            current_user_id = get_jwt_identity()
            current_user = UserRepository.get_by_id(current_user_id)
            if not current_user:
                return jsonify({"message": "User không tồn tại"}), 404
        except Exception as e:
            return jsonify({"message": f"Token không hợp lệ: {str(e)}"}), 401

        return f(current_user, *args, **kwargs)

    return decorated


def roles_required(*roles):
    def wrapper(f):
        @wraps(f)
        @jwt_required()
        def decorated(*args, **kwargs):
            current_user_id = get_jwt_identity()
            current_user = UserRepository.get_by_id(current_user_id)
            print("user role:", current_user.role.value)  # Debug

            if not current_user:
                return jsonify({"message": "User không tồn tại"}), 404

            # Chuyển về chữ thường
            user_role_lower = current_user.role.value.lower()
            required_roles_lower = [r.lower() for r in roles]

            if user_role_lower not in required_roles_lower:
                return jsonify({
                    "message": f"Không có quyền truy cập. Role hiện tại: {user_role_lower}, Role yêu cầu: {required_roles_lower}"
                }), 403

            return f(current_user, *args, **kwargs)

        return decorated

    return wrapper