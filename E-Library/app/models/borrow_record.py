from datetime import date
from app import db
from app.models.enums import BorrowStatus


class BorrowRecord(db.Model):
    __tablename__ = "borrow_records"

    id = db.Column(db.Integer, primary_key=True)
    borrow_date = db.Column(db.Date, default=date.today)
    due_date = db.Column(db.Date, nullable=False)
    return_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.Enum(BorrowStatus), default=BorrowStatus.BORROWED, nullable=False)

    reader_id = db.Column(db.Integer, db.ForeignKey("readers.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)

    reader = db.relationship("Reader", back_populates="borrow_records")
    book = db.relationship("Book", back_populates="borrow_records")

    @property
    def calculated_status(self):
        if self.return_date:
            if self.return_date > self.due_date:
                return BorrowStatus.RETURNED_LATE
            return BorrowStatus.RETURNED
        elif date.today() > self.due_date:
            return BorrowStatus.OVERDUE
        return BorrowStatus.BORROWED

    def update_status(self):
        self.status = self.calculated_status

    def to_dict(self):
        return {
            "id": self.id,
            "borrow_date": str(self.borrow_date),
            "due_date": str(self.due_date),
            "return_date": str(self.return_date) if self.return_date else None,
            "status": self.status.value,
            "reader_id": self.reader_id,
            "book_id": self.book_id,
            "book_title": self.book.title if self.book else None,
            "reader_name": self.reader.user.full_name if self.reader and self.reader.user else None,
            "is_overdue": self.status == BorrowStatus.OVERDUE
        }