import os

class Config:
    # Lấy secret key từ biến môi trường (hoặc default)
    SECRET_KEY = os.getenv("SECRET_KEY", "dev_key")

    # Cấu hình database MySQL
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-jwt-key")
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 giờ