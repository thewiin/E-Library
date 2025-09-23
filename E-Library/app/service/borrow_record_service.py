from datetime import datetime, timedelta
from app.models import BorrowRecord
from app.models.enums import BorrowStatus
from app.repository.book_repository import BookRepository
from app.repository.borrow_record_repository import BorrowRepository
from app.repository.reader_repository import ReaderRepository


class BorrowService:
    @staticmethod
    def borrow_book(reader_id, book_id, due_days=14):
        # Kiểm tra sách tồn tại
        book = BookRepository.get_by_id(book_id)
        if not book:
            raise ValueError("Sách không tồn tại")

        # Kiểm tra số lượng sách có sẵn
        active_borrows = BorrowRepository.get_active_by_book(book_id)
        if len(active_borrows) >= book.so_luong:
            raise ValueError("Sách đã được mượn hết")

        # Kiểm tra reader tồn tại
        reader = ReaderRepository.get_by_id(reader_id)
        if not reader:
            raise ValueError("Reader không tồn tại")

        # Kiểm tra reader đã mượn sách này chưa
        existing_borrow = BorrowRepository.get_by_reader_and_book(reader_id, book_id, returned=False)
        if existing_borrow:
            raise ValueError("Bạn đang mượn sách này")

        # Tạo borrow record
        borrow_record = BorrowRecord(
            reader_id=reader_id,
            book_id=book_id,
            borrow_date=datetime.now().date(),
            due_date=datetime.now().date() + timedelta(days=due_days),
            status=BorrowStatus.BORROWED
        )

        return BorrowRepository.save(borrow_record)

    @staticmethod
    def return_book(record_id):
        record = BorrowRepository.get_by_id(record_id)
        if not record:
            raise ValueError("Không tìm thấy record mượn sách")

        if record.return_date:
            raise ValueError("Sách đã được trả trước đó")

        record.return_date = datetime.now().date()

        # Cập nhật status
        if record.return_date > record.due_date:
            record.status = BorrowStatus.RETURNED_LATE
        else:
            record.status = BorrowStatus.RETURNED

        return BorrowRepository.save(record)

    @staticmethod
    def get_reader_borrow_history(reader_id):
        return BorrowRepository.get_reader_history(reader_id)

    @staticmethod
    def get_all_borrow_records():
        return BorrowRepository.get_all()

    @staticmethod
    def get_overdue_records():
        return BorrowRepository.get_overdue_records()

    @staticmethod
    def get_records_by_status(status):
        return BorrowRepository.get_by_status(status)

    @staticmethod
    def update_overdue_records():
        """Cron job để cập nhật status quá hạn"""
        today = datetime.now().date()
        overdue_records = BorrowRecord.query.filter(
            BorrowRecord.due_date < today,
            BorrowRecord.return_date.is_(None),
            BorrowRecord.status != BorrowStatus.OVERDUE
        ).all()

        for record in overdue_records:
            record.status = BorrowStatus.OVERDUE
            BorrowRepository.save(record)

        return len(overdue_records)