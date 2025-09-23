from datetime import datetime

from app.models import Comment
from app.repository.comment_repository import CommentRepository


class CommentService:
    @staticmethod
    def add_comment(user, book_id: int, content: str):
        """
        Thêm bình luận mới từ User (phải là reader)
        """
        if not hasattr(user, 'reader') or not user.reader:
            raise ValueError("Chỉ reader mới có thể bình luận")

        comment = Comment(
            reader_id=user.reader.id,
            book_id=book_id,
            content=content,
            created_at=datetime.now()
        )
        return CommentRepository.add_comment(comment)

    @staticmethod
    def get_comments_by_book(book_id: int):
        return CommentRepository.get_comments_by_book(book_id)

    @staticmethod
    def get_comments_by_reader(user):
        if not user.reader:
            return []
        return CommentRepository.get_comments_by_reader(user.reader.id)
