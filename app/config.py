import os

class Config:
    # Lấy secret key từ biến môi trường (hoặc default)
    SECRET_KEY = os.getenv("SECRET_KEY", "dev_key")

    # Cấu hình database PostgreSQL
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:password@localhost:5432/mydb"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
