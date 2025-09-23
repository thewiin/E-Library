from app.extensions import db
from app.models import Librarian

class LibrarianRepository:
    @staticmethod
    def get_by_id(librarian_id):
        return db.session.get(Librarian, librarian_id)

    @staticmethod
    def get_by_user_id(user_id):
        return Librarian.query.filter_by(user_id=user_id).first()

    @staticmethod
    def save(librarian):
        db.session.add(librarian)
        db.session.commit()
        return librarian

    @staticmethod
    def delete(librarian):
        db.session.delete(librarian)
        db.session.commit()
