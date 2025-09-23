from flask import Blueprint, request, jsonify

from app.service.comment_service import CommentService
from app.utils import token_required

comment_bp = Blueprint("comment_bp", __name__)

# ----------------- Thêm bình luận -----------------
@comment_bp.route("/add", methods=["POST"])
@token_required
def add_comment(current_user):
    data = request.get_json()
    book_id = data.get("book_id")
    content = data.get("content")

    if not book_id or not content:
        return jsonify({"message": "book_id và content là bắt buộc"}), 400

    try:
        comment = CommentService.add_comment(current_user, book_id, content)
        return jsonify({
            "message": "Bình luận thành công",
            "comment": comment.to_dict()
        }), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 403

# ----------------- Lấy bình luận theo sách -----------------
@comment_bp.route("/books/<int:book_id>", methods=["GET"])
def get_comments_by_book(book_id):
    comments = CommentService.get_comments_by_book(book_id)
    return jsonify({
        "comments": [c.to_dict() for c in comments]
    }), 200

# ----------------- Lấy bình luận của chính user -----------------
@comment_bp.route("/me", methods=["GET"])
@token_required
def get_my_comments(current_user):
    comments = CommentService.get_comments_by_reader(current_user)
    return jsonify({
        "comments": [c.to_dict() for c in comments]
    }), 200
