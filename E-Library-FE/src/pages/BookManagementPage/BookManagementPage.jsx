import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import * as bookService from '../../services/bookService';
import BookTable from '../../components/BookManagement/BookTable';
import BookFormModal from '../../components/BookManagement/BookFormModal';
import './BookManagementPage.css'; // File CSS cho trang này

const BookManagementPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const res = await bookService.getAllBooks();
            setBooks(res.data); 
        } catch (error) {
            console.error("Failed to fetch books:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleOpenModal = (book = null) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBook(null);
    };

    const handleSave = async (formData) => {
        try {
            if (editingBook) {
                await bookService.updateBook(editingBook.id, formData);
            } else {
                await bookService.createBook(formData);
            }
            fetchBooks(); // Tải lại danh sách sau khi lưu
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save book:", error);
        }
    };

    const handleDelete = async (bookId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
            try {
                await bookService.deleteBook(bookId);
                fetchBooks(); // Tải lại danh sách sau khi xóa
            } catch (error) {
                console.error("Failed to delete book:", error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-management-container">
            <header className="page-header">
                <h1>Kho sách</h1>
                <button className="add-button" onClick={() => handleOpenModal()}>
                    <Plus size={20} />
                    Thêm sách mới
                </button>
            </header>
            
            {/* Thanh tìm kiếm và bộ lọc (bạn có thể thêm logic sau) */}
            <div className="filters-container">
                <input type="text" placeholder="Type here..." className="search-input" />
                {/* Thêm các dropdown filter ở đây */}
            </div>

            <main className="table-container">
                <BookTable 
                    books={books} 
                    onEdit={handleOpenModal} 
                    onDelete={handleDelete} 
                />
            </main>

            {isModalOpen && (
                <BookFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    initialData={editingBook}
                />
            )}
        </div>
    );
};

export default BookManagementPage;