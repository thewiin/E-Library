from flask_bcrypt import generate_password_hash, check_password_hash
from marshmallow import validates

from app import db
from sqlalchemy.sql import func
from sqlalchemy import Enum

from app.models.enums import GenderEnum, RoleEnum


class User(db.Model):
    __tablename__ = "users"
    __table_args__ = (
        db.Index("ix_users_email", "email"),
    )

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.Date, nullable=True)
    gender = db.Column(Enum(GenderEnum), nullable=True)
    role = db.Column(Enum(RoleEnum), default=RoleEnum.READER, nullable=False)

    is_active = db.Column(db.Boolean, default=True, nullable=False)

    created_date = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_date = db.Column(db.DateTime, onupdate=func.now())

    # Quan hệ 1-1
    reader = db.relationship("Reader", back_populates="user", uselist=False, cascade="all, delete-orphan")
    admin = db.relationship("Admin", back_populates="user", uselist=False, cascade="all, delete-orphan")

    # ----------------- VALIDATION / NORMALIZATION -----------------
    @validates("email")
    def _normalize_email(self, key, value):
        return value.strip().lower() if value else value

    # ----------------- PASSWORD UTILS -----------------
    def set_password(self, raw_password: str) -> None:
        self.password = generate_password_hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        return check_password_hash(self.password, raw_password)

    # ----------------- ROLE / DISPLAY UTILS -----------------
    @property
    def is_admin(self) -> bool:
        return self.role == RoleEnum.ADMIN

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()

    def jwt_identity(self) -> dict:
        """Dữ liệu nhúng vào JWT (tối giản)."""
        return {"id": self.id, "role": self.role.value if self.role else None}

    # ----------------- SERIALIZATION -----------------
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob.isoformat() if self.dob else None,
            "gender": self.gender.value if self.gender else None,
            "role": self.role.value if self.role else None,
            "is_active": self.is_active,
            "created_date": self.created_date.isoformat() if self.created_date else None,
            "updated_date": self.updated_date.isoformat() if self.updated_date else None,
        }

    def __repr__(self):
        return f"<User id={self.id} email={self.email} role={self.role}>"