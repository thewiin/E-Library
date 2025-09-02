from datetime import date
from app import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, default=date.today)

    reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)

    # Quan hệ
    reader = db.relationship("Reader", back_populates="comments")
    book = db.relationship("Book", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_at": str(self.created_at),
            "reader_id": self.reader_id,
            "book_id": self.book_id
        }
