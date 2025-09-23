from flask import Blueprint, request, jsonify
from app.service.book_service import BookService
from app.utils import roles_required
from app.utils.decorators import token_required

book_bp = Blueprint("book", __name__)

@book_bp.route("", methods=["GET"])
def get_books():
    filters = {
        "q": request.args.get("q"),
        "author": request.args.get("author"),
        "category_id": request.args.get("category_id", type=int),
        "page": request.args.get("page", type=int, default=1),
        "per_page": request.args.get("per_page", type=int, default=5),
    }
    result = BookService.get_books(filters)
    return jsonify({
        "items": result["items"],
        "total": result["total"],
        "page": result["page"],
        "per_page": result["per_page"],
        "pages": result["pages"]
    })


# Lấy chi tiết sách
@book_bp.route("/<int:book_id>", methods=["GET"])
def get_book(book_id):
    book = BookService.get_by_id(book_id)
    if not book:
        return jsonify({"message": "Không tìm thấy sách"}), 404
    return jsonify(book.to_dict())


# Thêm sách
@book_bp.route("", methods=["POST"])
@roles_required("ADMIN", "LIBRARIAN")
def create_book(current_user):
    data = request.form

    # Lấy ảnh
    image_file = request.files.get("image")

    # so_luong kiểu int
    try:
        so_luong = int(data.get("so_luong", 0))
        if so_luong < 0:
            so_luong = 0
    except ValueError:
        so_luong = 0

    # category_ids là list int
    category_ids_raw = request.form.getlist("category_ids")
    category_ids = []
    for c in category_ids_raw:
        try:
            category_ids.append(int(c))
        except ValueError:
            continue  # bỏ qua nếu không phải số

    # Tạo sách
    book = BookService.create_book(
        title=data.get("title"),
        author=data.get("author"),
        description=data.get("description"),
        so_luong=so_luong,
        category_ids=category_ids,
        image_file=image_file
    )

    return jsonify(book.to_dict()), 201


# Cập nhật sách
@book_bp.route("/<int:book_id>", methods=["PUT"])
@roles_required("ADMIN", "LIBRARIAN")
def update_book(current_user, book_id):
    data = request.form
    image_file = request.files.get("image")

    # Xử lý so_luong an toàn hơn
    so_luong = data.get("so_luong")
    if so_luong is not None:
        try:
            so_luong = int(so_luong)
        except ValueError:
            return jsonify({"message": "Số lượng phải là số"}), 400

    # Xử lý category_ids
    category_ids_raw = request.form.getlist("category_ids")
    category_ids = []
    for c in category_ids_raw:
        try:
            category_ids.append(int(c))
        except ValueError:
            continue  # bỏ qua không phải số

    book = BookService.update_book(
        book_id,
        title=data.get("title"),
        author=data.get("author"),
        description=data.get("description"),
        so_luong=so_luong,  # 👈 đã xử lý
        category_ids=category_ids,
        image_file=image_file
    )

    if not book:
        return jsonify({"message": "Không tìm thấy sách"}), 404

    return jsonify(book.to_dict())

# Xóa sách
@book_bp.route("/<int:book_id>", methods=["DELETE"])
@token_required
@roles_required("ADMIN", "LIBRARIAN")
def delete_book(current_user, book_id):
    book = BookService.delete_book(book_id)
    if not book:
        return jsonify({"message": "Không tìm thấy sách"}), 404
    return jsonify({"message": "Đã xóa thành công"})

