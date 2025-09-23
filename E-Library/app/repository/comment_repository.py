from app import db
from app.models import Comment

class CommentRepository:
    @staticmethod
    def add_comment(comment: Comment):
        db.session.add(comment)
        db.session.commit()
        return comment

    @staticmethod
    def get_comments_by_book(book_id: int):
        return Comment.query.filter_by(book_id=book_id).order_by(Comment.created_at.desc()).all()

    @staticmethod
    def get_comments_by_reader(reader_id: int):
        return Comment.query.filter_by(reader_id=reader_id).order_by(Comment.created_at.desc()).all()
