from app import db


class Admin(db.Model):
    __tablename__ = "admins"

    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

    user = db.relationship("User", back_populates="admin")
