from app.models import Book, Category
from app.extensions import db

class BookRepository:
    @staticmethod
    def get_all():
        return Book.query.all()

    @staticmethod
    def get_by_id(book_id):
        return Book.query.get(book_id)

    @staticmethod
    def save(book):
        db.session.add(book)
        db.session.commit()
        return book

    @staticmethod
    def delete(book):
        db.session.delete(book)
        db.session.commit()

    @staticmethod
    def get_categories_by_ids(category_ids):
        return Category.query.filter(Category.id.in_(category_ids)).all()
