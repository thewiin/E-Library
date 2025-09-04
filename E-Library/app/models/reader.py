from app import db


class Reader(db.Model):
    __tablename__ = "readers"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    is_in_black_list = db.Column(db.Boolean, default=False, nullable=False)

    user = db.relationship(
        "User",
        back_populates="reader",
        uselist=False,
        single_parent=True
    )
    borrow_records = db.relationship("BorrowRecord", back_populates="reader", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="reader", cascade="all, delete-orphan")

    def to_dict(self):
        data = self.user.to_dict()
        data["is_in_black_list"] = self.is_in_black_list
        return data
