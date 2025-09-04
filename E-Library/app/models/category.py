from app import db

class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    books = db.relationship("Book", secondary="book_category", back_populates="categories")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "books": [b.to_dict() for b in self.books]
        }
