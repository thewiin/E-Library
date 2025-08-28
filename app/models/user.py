from datetime import date
from app import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    dob = db.Column(db.Date, nullable=True)
    gender = db.Column(db.Boolean, nullable=True)  # True = Male, False = Female
    created_date = db.Column(db.Date, default=date.today)

    # Quan hệ 1-1
    reader = db.relationship("Reader", back_populates="user", uselist=False)
    admin = db.relationship("Admin", back_populates="user", uselist=False)
