from sqlalchemy import or_
from app.models import Book, Category
from app.extensions import db

class BookRepository:
    @staticmethod
    def get_books(filters=None):
        query = Book.query

        if filters:
            q = filters.get("q")
            author = filters.get("author")
            category_id = filters.get("category_id")
            page = filters.get("page", 1)
            per_page = filters.get("per_page", 10)

            # Filter theo title / description
            if q:
                query = query.filter(
                    or_(
                        Book.title.ilike(f"%{q}%"),
                        Book.description.ilike(f"%{q}%")
                    )
                )

            # Filter theo author
            if author:
                query = query.filter(Book.author.ilike(f"%{author}%"))

            # Filter theo category (mối quan hệ nhiều-nhiều)
            if category_id:
                query = query.join(Book.categories).filter(Category.id == category_id)

        else:
            page = 1
            per_page = 10

        # Phân trang
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        # Trả dict trực tiếp cho API JSON
        return {
            "items": [book.to_dict_basic() for book in pagination.items],
            "total": pagination.total,
            "page": pagination.page,
            "per_page": pagination.per_page,
            "pages": pagination.pages
        }

    @staticmethod
    def get_by_id(book_id):
        return db.session.get(Book, book_id)

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
