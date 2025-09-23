from flask import Blueprint, request, jsonify
from app.service.auth_service import AuthService

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    # Dữ liệu từ form
    data = request.form
    avatar_file = request.files.get("avatar")

    user = AuthService.register(
        email=data["email"],
        password=data["password"],
        first_name=data["first_name"],
        last_name=data["last_name"],
        dob=data.get("dob"),
        gender=data.get("gender"),
        role=data.get("role"),
        avatar_file=avatar_file
    )
    return jsonify(user.to_dict()), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    token, _ = AuthService.login(data["email"], data["password"])
    if token:
        return jsonify({"token": token}), 200
    return jsonify({"message": "Sai email hoặc mật khẩu"}), 401
