from flask import Blueprint, request, jsonify
from app.models.enums import BorrowStatus
from app.service.borrow_record_service import BorrowService
from app.utils.decorators import token_required, roles_required

borrow_bp = Blueprint("borrow", __name__)


# Mượn sách
@borrow_bp.route("", methods=["POST"])
@token_required
def borrow_book(current_user):
    data = request.get_json()
    book_id = data.get("book_id")

    if not book_id:
        return jsonify({"message": "Thiếu book_id"}), 400

    try:
        if not hasattr(current_user, 'reader') or not current_user.reader:
            return jsonify({"message": "Chỉ reader được mượn sách"}), 403

        record = BorrowService.borrow_book(current_user.reader.id, book_id)
        return jsonify({
            "message": "Mượn sách thành công",
            "record": record.to_dict()
        }), 201

    except ValueError as e:
        return jsonify({"message": str(e)}), 400


# Trả sách
@borrow_bp.route("/<int:record_id>/return", methods=["PUT"])
@token_required
def return_book(current_user, record_id):
    try:
        record = BorrowService.return_book(record_id)

        # Kiểm tra quyền
        if (not hasattr(current_user, 'reader') or current_user.reader.id != record.reader_id) and \
                current_user.role.value not in ['librarian', 'admin']:
            return jsonify({"message": "Không có quyền trả sách này"}), 403

        return jsonify({
            "message": "Trả sách thành công",
            "record": record.to_dict()
        })

    except ValueError as e:
        return jsonify({"message": str(e)}), 400


# Lịch sử mượn của reader
@borrow_bp.route("/my-books", methods=["GET"])
@token_required
def get_my_borrow_history(current_user):
    if not hasattr(current_user, 'reader') or not current_user.reader:
        return jsonify({"message": "Chỉ reader có lịch sử mượn"}), 403

    records = BorrowService.get_reader_borrow_history(current_user.reader.id)
    return jsonify({
        "records": [record.to_dict() for record in records]
    })


# Quản lý mượn trả (cho librarian/admin)
@borrow_bp.route("/records", methods=["GET"])
@roles_required("admin", "librarian")
def get_all_borrow_records(current_user):
    records = BorrowService.get_all_borrow_records()
    return jsonify({
        "records": [record.to_dict() for record in records]
    })


# Sách quá hạn
@borrow_bp.route("/overdue", methods=["GET"])
@roles_required("admin", "librarian")
def get_overdue_records(current_user):
    records = BorrowService.get_overdue_records()
    return jsonify({
        "records": [record.to_dict() for record in records]
    })


# Lấy record theo trạng thái
@borrow_bp.route("/status/<status>", methods=["GET"])
@roles_required("admin", "librarian")
def get_records_by_status(current_user, status):
    try:
        status_enum = BorrowStatus(status)
        records = BorrowService.get_records_by_status(status_enum)
        return jsonify({
            "records": [record.to_dict() for record in records]
        })
    except ValueError:
        return jsonify({"message": "Trạng thái không hợp lệ"}), 400


# Sách đang mượn của reader
@borrow_bp.route("/my-books/active", methods=["GET"])
@token_required
def get_my_active_borrows(current_user):
    if not hasattr(current_user, 'reader') or not current_user.reader:
        return jsonify({"message": "Chỉ reader có sách mượn"}), 403

    records = BorrowService.get_reader_borrow_history(current_user.reader.id)
    active_records = [r for r in records if not r.return_date]

    return jsonify({
        "records": [record.to_dict() for record in active_records]
    })