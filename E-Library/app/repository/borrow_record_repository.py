from app.models import BorrowRecord
from app import db

class BorrowRepository:
    @staticmethod
    def get_by_id(record_id):
        return BorrowRecord.query.get(record_id)

    @staticmethod
    def get_by_reader_and_book(reader_id, book_id, returned=False):
        query = BorrowRecord.query.filter_by(reader_id=reader_id, book_id=book_id)
        if returned is not None:
            query = query.filter(BorrowRecord.return_date.is_(None) if not returned else BorrowRecord.return_date.isnot(None))
        return query.first()

    @staticmethod
    def get_active_by_reader(reader_id):
        return BorrowRecord.query.filter_by(reader_id=reader_id, return_date=None).all()

    # Lấy các sách có sẵn
    @staticmethod
    def get_active_by_book(book_id):
        return BorrowRecord.query.filter_by(book_id=book_id, return_date=None).all()

    @staticmethod
    def get_by_status(status):
        return BorrowRecord.query.filter_by(status=status).all()

    @staticmethod
    def get_overdue_records():
        from datetime import date
        return BorrowRecord.query.filter(
            BorrowRecord.due_date < date.today(),
            BorrowRecord.return_date.is_(None)
        ).all()

    @staticmethod
    def get_reader_history(reader_id):
        return BorrowRecord.query.filter_by(reader_id=reader_id).order_by(BorrowRecord.borrow_date.desc()).all()

    @staticmethod
    def save(record):
        db.session.add(record)
        db.session.commit()
        return record

    @staticmethod
    def get_all():
        return BorrowRecord.query.all()