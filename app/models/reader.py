from app import db


class Reader(db.Model):
    __tablename__ = "readers"

    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    is_in_black_list = db.Column(db.Boolean, default=False)

    # Quan hệ
    user = db.relationship("User", back_populates="reader")
    borrow_records = db.relationship("BorrowRecord", back_populates="reader")
    comments = db.relationship("Comment", back_populates="reader")
