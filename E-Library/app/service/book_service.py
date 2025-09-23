import cloudinary.uploader
from app.models import Book
from app.repository.book_repository import BookRepository

class BookService:
    @staticmethod
    def get_books(filters=None):
        return BookRepository.get_books(filters)

    @staticmethod
    def get_by_id(book_id):
        return BookRepository.get_by_id(book_id)

    @staticmethod
    def create_book(title, author=None, description=None, so_luong=0, category_ids=None, image_file=None):
        # Upload ảnh nếu có
        image_url = None
        if image_file:
            upload_result = cloudinary.uploader.upload(image_file)
            image_url = upload_result.get("secure_url")

        book = Book(
            title=title,
            author=author,
            description=description,
            so_luong=so_luong,
            image=image_url
        )

        # Thêm categories
        if category_ids:
            categories = BookRepository.get_categories_by_ids(category_ids)
            book.categories = categories

        return BookRepository.save(book)

    @staticmethod
    def update_book(book_id, title=None, author=None, description=None, so_luong=None, category_ids=None,
                    image_file=None):
        book = BookRepository.get_by_id(book_id)
        if not book:
            return None

        # Validation cơ bản
        if so_luong is not None and so_luong < 0:
            so_luong = 0

        if title:
            book.title = title.strip()
        if author:
            book.author = author.strip()
        if description:
            book.description = description.strip()
        if so_luong is not None:
            book.so_luong = so_luong

        # Upload ảnh mới
        if image_file:
            # Kiểm tra định dạng ảnh
            if image_file.filename == '':
                return None  # hoặc xử lý lỗi
            upload_result = cloudinary.uploader.upload(image_file)
            book.image = upload_result.get("secure_url")

        # Cập nhật categories
        if category_ids is not None:
            categories = BookRepository.get_categories_by_ids(category_ids)
            book.categories = categories

        return BookRepository.save(book)

    @staticmethod
    def delete_book(book_id):
        book = BookRepository.get_by_id(book_id)
        if not book:
            return None
        BookRepository.delete(book)
        return book
