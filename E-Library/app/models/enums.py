import enum

class GenderEnum(enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class RoleEnum(enum.Enum):
    ADMIN = "admin"
    READER = "reader"

class BookStatusEnum(enum.Enum):
    AVAILABLE = "available"
    BORROWED = "borrowed"
    LOST = "lost"