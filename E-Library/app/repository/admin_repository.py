from app import db
from app.models import Admin

class AdminRepository:
    @staticmethod
    def save(admin):
        db.session.add(admin)
        db.session.commit()
        return admin

    @staticmethod
    def get_by_user_id(user_id):
        return Admin.query.filter_by(user_id=user_id).first()
