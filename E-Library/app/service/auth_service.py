from datetime import timedelta

from flask_jwt_extended import create_access_token
from app.extensions import bcrypt
from app.models import User, Reader, Admin, Librarian
from app.models.enums import RoleEnum
from app.repository.admin_repository import AdminRepository
from app.repository.librarian_repository import LibrarianRepository
from app.repository.reader_repository import ReaderRepository
from app.repository.user_repository import UserRepository
import cloudinary.uploader


class AuthService:
    @staticmethod
    def register(email, password, first_name, last_name, dob=None, gender=None, role=None, avatar_file=None):
        if UserRepository.get_by_email(email):
            raise ValueError("Email đã tồn tại")

        # Upload avatar lên Cloudinary (nếu có)
        avatar_url = None
        if avatar_file:
            upload_result = cloudinary.uploader.upload(avatar_file)
            avatar_url = upload_result.get("secure_url")

        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")

        # Mặc định nếu không truyền role thì là READER
        if role:
            try:
                # chuyển role về chữ thường trước khi tạo Enum
                role_enum = RoleEnum(role.lower())
            except ValueError:
                raise ValueError(f"Role '{role}' không hợp lệ")
        else:
            role_enum = RoleEnum.READER

        user = User(
            email=email,
            password=hashed_pw,
            first_name=first_name,
            last_name=last_name,
            dob=dob,
            gender=gender,
            role=role_enum,
            avatar=avatar_url
        )

        saved_user = UserRepository.save(user)

        # Tạo bản ghi phụ theo role
        if role_enum == RoleEnum.READER:
            reader = Reader(user_id=saved_user.id)
            ReaderRepository.save(reader)
        elif role_enum == RoleEnum.ADMIN:
            admin = Admin(user_id=saved_user.id)
            AdminRepository.save(admin)
        elif role_enum == RoleEnum.LIBRARIAN:
            librarian = Librarian(user_id=saved_user.id)
            LibrarianRepository.save(librarian)

        return saved_user

    @staticmethod
    def login(email, password):
        user = UserRepository.get_by_email(email)
        if user and bcrypt.check_password_hash(user.password, password):
            # identity có thể là user.id hoặc dict (id, role,...)
            token = create_access_token(identity=user.jwt_identity(), expires_delta=timedelta(seconds=3600))
            return token, user
        return None, None
