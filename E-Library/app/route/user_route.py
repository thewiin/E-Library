from flask import Blueprint, request, jsonify

from app.service.user_service import UserService
from app.utils import token_required, roles_required

user_bp = Blueprint("user", __name__)

@user_bp.route("/profile", methods=["GET"])
@token_required
def get_profile(current_user):
    """
    Lấy thông tin profile của user đang đăng nhập
    """
    return jsonify(current_user.to_dict()), 200

@user_bp.route("/<int:user_id>", methods=["PUT"])
@token_required
def update_user(current_user, user_id):
    # Chỉ cho ADMIN hoặc chính chủ update
    if current_user.role.value != "ADMIN" and current_user.id != user_id:
        return jsonify({"message": "Không có quyền"}), 403

    data = request.form
    avatar_file = request.files.get("avatar")

    user = UserService.update_user(
        user_id,
        avatar_file=avatar_file,
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        dob=data.get("dob"),
        gender=data.get("gender"),
        role=data.get("role") if current_user.role.value == "ADMIN" else None,  # chỉ ADMIN mới đổi role
        is_active=data.get("is_active") if current_user.role.value == "ADMIN" else None  # chỉ ADMIN mới đổi trạng thái
    )

    if not user:
        return jsonify({"message": "User không tồn tại"}), 404

    return jsonify(user.to_dict())
