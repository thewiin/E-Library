from app.models import Book
from app.repository.book_repository import BookRepository

class BookService:
    @staticmethod
    def get_books():
        return BookRepository.get_all()

    @staticmethod
    def get_book(book_id):
        return BookRepository.get_by_id(book_id)

    @staticmethod
    def create_book(title, author=None, description=None, image=None,
                    so_luong=0, publisher=None, published_year=None, isbn=None, category_ids=None):
        book = Book(
            title=title,
            author=author,
            description=description,
            image=image,
            so_luong=so_luong,
            publisher=publisher,
            published_year=published_year,
            isbn=isbn,
        )
        if category_ids:
            book.categories = BookRepository.get_categories_by_ids(category_ids)

        return BookRepository.save(book)

    @staticmethod
    def update_book(book_id, **kwargs):
        book = BookRepository.get_by_id(book_id)
        if not book:
            return None

        for key, value in kwargs.items():
            if hasattr(book, key):
                setattr(book, key, value)

        if "category_ids" in kwargs and kwargs["category_ids"]:
            book.categories = BookRepository.get_categories_by_ids(kwargs["category_ids"])

        return BookRepository.save(book)

    @staticmethod
    def delete_book(book_id):
        book = BookRepository.get_by_id(book_id)
        if not book:
            return None
        BookRepository.delete(book)
        return book
