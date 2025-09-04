from app import db

from .user import User
from .reader import Reader
from .admin import Admin
from .book import Book
from .borrow_record import BorrowRecord
from .comment import Comment
from .category import Category

__all__ = [
    "User",
    "Reader",
    "Admin",
    "Book",
    "BorrowRecord",
    "Comment",
    "Category",
]
