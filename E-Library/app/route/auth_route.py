from flask import Blueprint, request, jsonify
from app.service.auth_service import AuthService

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    try:
        user = AuthService.register(
            email=data["email"],
            password=data["password"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            dob=data.get("dob"),
            gender=data.get("gender"),
            role=data.get("role")
        )
        return jsonify(user.to_dict()), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    token, _ = AuthService.login(data["email"], data["password"])
    if token:
        return jsonify({"token": token})
    return jsonify({"message": "Sai email hoặc mật khẩu"}), 401
