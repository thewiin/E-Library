from app import db
from sqlalchemy.sql import func


book_category = db.Table(
    "book_category",
    db.Column("book_id", db.Integer, db.ForeignKey("books.id"), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey("categories.id"), primary_key=True)
)


class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100))
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    so_luong = db.Column(db.Integer, default=0)
    created_date = db.Column(db.DateTime, server_default=func.now())
    updated_date = db.Column(db.DateTime, onupdate=func.now())

    categories = db.relationship("Category", secondary=book_category, back_populates="books")
    borrow_records = db.relationship("BorrowRecord", back_populates="book")
    comments = db.relationship("Comment", back_populates="book")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "description": self.description,
            "image": self.image,
            "so_luong": self.so_luong,
            "created_date": str(self.created_date),
            "updated_date": str(self.updated_date) if self.updated_date else None,

            "comments": [c.to_dict() for c in self.comments]
        }