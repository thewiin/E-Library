from app import db


class Admin(db.Model):
    __tablename__ = "admins"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)

    # Quan hệ 1-1 với User
    user = db.relationship(
        "User",
        back_populates="admin",
        uselist=False,
        single_parent=True
    )

    def to_dict(self):
        data = self.user.to_dict()
        return data

    def __repr__(self):
        return f"<Admin id={self.id}, user_id={self.user_id}>"
