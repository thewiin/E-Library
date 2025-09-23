# app/repository/reader_repository.py
from app import db
from app.models import Reader

class ReaderRepository:
    @staticmethod
    def save(reader):
        db.session.add(reader)
        db.session.commit()
        return reader

    @staticmethod
    def get_by_user_id(user_id):
        return Reader.query.filter_by(user_id=user_id).first()
