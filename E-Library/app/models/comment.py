from datetime import datetime
from app import db

class Comment(db.Model):
    __tablename__ = "comments"
    __table_args__ = (
        db.Index("ix_comments_book_id", "book_id"),
        db.Index("ix_comments_reader_id", "reader_id"),
    )

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

    reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)

    reader = db.relationship("Reader", back_populates="comments")
    book = db.relationship("Book", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "reader_id": self.reader_id,
            "book_id": self.book_id
        }
