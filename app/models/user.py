from app import db
from sqlalchemy.sql import func
from sqlalchemy import Enum

from app.models.enums import GenderEnum, RoleEnum


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.Date, nullable=True)
    gender = db.Column(Enum(GenderEnum), nullable=True)
    role = db.Column(Enum(RoleEnum), default=RoleEnum.READER, nullable=False)
    created_date = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_date = db.Column(db.DateTime, onupdate=func.now())

    # Quan hệ 1-1
    reader = db.relationship("Reader", back_populates="user", uselist=False)
    admin = db.relationship("Admin", back_populates="user", uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob.isoformat() if self.dob else None,
            "gender": self.gender.value if self.gender else None,
            "role": self.role.value if self.role else None,
            "created_date": self.created_date.isoformat() if self.created_date else None,
            "updated_date": self.updated_date.isoformat() if self.updated_date else None,
        }
