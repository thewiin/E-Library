from app import db

from .user import User
from .reader import Reader
from .admin import Admin
from .book import Book
from .borrow import BorrowRecord
from .comment import Comment

__all__ = [
    "User",
    "Reader",
    "Admin",
    "Book",
    "BorrowRecord",
    "Comment",
]
