import React from 'react';
import { MoreVertical } from 'lucide-react'; 

const StatusIndicator = ({ status }) => {
    const statusClasses = {
        available: 'status-available',
        unavailable: 'status-unavailable',
        lending: 'status-lending',
    };
    const statusClass = statusClasses[status] || 'status-default';
    return <span className={`status-indicator ${statusClass}`}></span>;
};

const BookTable = ({ books, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Mã sách</th>
                    <th>Tên sách</th>
                    <th>Tên tác giả</th>
                    <th>Thể loại</th>
                    <th>Năm XB</th>
                    <th>Số lượng</th>
                    <th>Còn lại</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.ma_sach || `BK${String(book.id).padStart(3, '0')}`}</td>
                        <td className="book-info">
                            <img src={book.image_url} alt={book.title} className="book-cover-thumbnail" />
                            {book.title}
                        </td>
                        <td>{book.author}</td>
                        <td>{book.categories.join(', ')}</td>
                        <td>{book.nam_xb}</td>
                        <td>{book.so_luong}</td>
                        <td>{book.con_lai}</td>
                        <td>
                            <StatusIndicator status={book.status} />
                        </td>
                        <td>
                            <div className="action-menu">
                                <MoreVertical size={20} />
                                <div className="dropdown-content">
                                    <button onClick={() => onEdit(book)}>Sửa</button>
                                    <button onClick={() => onDelete(book.id)}>Xóa</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookTable;