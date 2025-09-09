from sqlalchemy import or_

from app.models import Book, Category
from app.extensions import db


class BookRepository:
    @staticmethod
    def get_books(filters=None):
        query = Book.query
        if not filters:
            return query.all()

        q = filters.get("q")
        author = filters.get("author")
        category_id = filters.get("category_id")
        page = filters.get("page", 1)  # mặc định trang 1
        per_page = filters.get("per_page", 10)  # mặc định 10 sách mỗi trang

        # tìm theo từ khóa
        if q:
            query = query.filter(
                or_(
                    Book.title.ilike(f"%{q}%"),
                    Book.description.ilike(f"%{q}%")
                )
            )

        # tìm theo tác giả
        if author:
            query = query.filter(Book.author.ilike(f"%{author}%"))

        # tìm theo thể loại
        if category_id:
            query = query.filter(Book.category_id == category_id)

        # phân trang
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        return {
            "items": pagination.items,
            "total": pagination.total,
            "page": pagination.page,
            "per_page": pagination.per_page,
            "pages": pagination.pages
        }

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
