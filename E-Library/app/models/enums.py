import enum

class GenderEnum(enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class RoleEnum(enum.Enum):
    ADMIN = "admin"
    READER = "reader"
    LIBRARIAN = "librarian"

class BorrowStatus(enum.Enum):
    BORROWED = "borrowed"      # Đang mượn
    RETURNED = "returned"      # Đã trả đúng hạn
    OVERDUE = "overdue"        # Quá hạn chưa trả
    RETURNED_LATE = "returned_late"  # Trả muộn