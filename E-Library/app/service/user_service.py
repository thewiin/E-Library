# app/service/user_service.py
from app.repository.user_repository import UserRepository
from app.models import User


class UserService:
    @staticmethod
    def get_user(user_id: int) -> User | None:
        return UserRepository.get_by_id(user_id)

    @staticmethod
    def get_all_users() -> list[User]:
        return UserRepository.get_all()

    @staticmethod
    def update_user(user_id: int, **kwargs) -> User | None:
        user = UserRepository.get_by_id(user_id)
        if not user:
            return None

        for key, value in kwargs.items():
            if hasattr(user, key) and value is not None:
                setattr(user, key, value)

        return UserRepository.save(user)

    @staticmethod
    def delete_user(user_id: int) -> bool:
        user = UserRepository.get_by_id(user_id)
        if not user:
            return False
        UserRepository.delete(user)
        return True
