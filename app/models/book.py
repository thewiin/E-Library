from app import db


class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100))
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    so_luong = db.Column(db.Integer, default=0)

    borrow_records = db.relationship("BorrowRecord", back_populates="book")
    comments = db.relationship("Comment", back_populates="book")
