from datetime import date
from app import db


class BorrowRecord(db.Model):
    __tablename__ = "borrow_records"

    id = db.Column(db.Integer, primary_key=True)
    borrow_date = db.Column(db.Date, default=date.today)
    due_date = db.Column(db.Date, nullable=False)

    reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)

    reader = db.relationship("Reader", back_populates="borrow_records")
    book = db.relationship("Book", back_populates="borrow_records")

    def to_dict(self):
        return {
            "id": self.id,
            "borrow_date": str(self.borrow_date),
            "due_date": str(self.due_date),
            "return_date": str(self.return_date) if self.return_date else None,
            "reader_id": self.reader_id,
            "book_id": self.book_id
        }
