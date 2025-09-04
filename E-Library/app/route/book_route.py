from flask import Blueprint, request, jsonify
from app.service.book_service import BookService
from app.utils.decorators import token_required

book_bp = Blueprint("book", __name__)

# Không cần xác thực
@book_bp.route("/", methods=["GET"])
def get_books():
    books = BookService.get_books()
    return jsonify([b.to_dict() for b in books])

@book_bp.route("/<int:book_id>", methods=["GET"])
def get_book(book_id):
    book = BookService.get_book(book_id)
    if not book:
        return jsonify({"message": "Book not found"}), 404
    return jsonify(book.to_dict())

# Cần xác thực
@book_bp.route("/", methods=["POST"])
@token_required
def create_book(current_user):
    data = request.get_json()
    book = BookService.create_book(
        title=data["title"],
        author=data.get("author"),
        description=data.get("description"),
        image=data.get("image"),
        so_luong=data.get("so_luong", 0),
        publisher=data.get("publisher"),
        published_year=data.get("published_year"),
        isbn=data.get("isbn"),
        category_ids=data.get("category_ids")
    )
    return jsonify(book.to_dict()), 201

@book_bp.route("/<int:book_id>", methods=["PUT"])
@token_required
def update_book(current_user, book_id):
    data = request.get_json()
    book = BookService.update_book(book_id, **data)
    if not book:
        return jsonify({"message": "Book not found"}), 404
    return jsonify(book.to_dict())

@book_bp.route("/<int:book_id>", methods=["DELETE"])
@token_required
def delete_book(current_user, book_id):
    book = BookService.delete_book(book_id)
    if not book:
        return jsonify({"message": "Book not found"}), 404
    return jsonify({"message": "Book deleted successfully"})
