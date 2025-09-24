import React, { useState, useEffect } from 'react';
import { X, UploadCloud } from 'lucide-react'; // Thêm icon
import './BookFormModal.css'; 

const BookFormModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        nam_xb: '',
        so_luong: '',
        description: '',
        category_ids: [],
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                author: initialData.author || '',
                nam_xb: initialData.nam_xb || '',
                so_luong: initialData.so_luong || '',
                description: initialData.description || '',
                category_ids: initialData.category_ids || [],
            });
            setImagePreview(initialData.image_url || '');
            setImageFile(null); // Reset file khi mở modal
        } else {
            // Reset form khi thêm mới
            setFormData({ title: '', author: '', nam_xb: '', so_luong: '', description: '', category_ids: [] });
            setImagePreview('');
            setImageFile(null);
        }
    }, [initialData, isOpen]); // Thêm isOpen để reset form mỗi khi mở

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        const categoryId = parseInt(value, 10);
        setFormData(prev => {
            const currentIds = prev.category_ids;
            if (checked) {
                return { ...prev, category_ids: [...currentIds, categoryId] };
            } else {
                return { ...prev, category_ids: currentIds.filter(id => id !== categoryId) };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'category_ids') {
                data.append(key, formData[key]);
            }
        });
        formData.category_ids.forEach(id => data.append('category_ids', id));
        if (imageFile) {
            data.append('image', imageFile);
        }
        onSave(data);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{initialData ? 'Sửa thông tin sách' : 'Thêm sách mới'}</h2>
                    <button onClick={onClose} className="close-button"><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="book-form">
                    <div className="form-grid">
                        {/* Cột trái: Tải ảnh */}
                        <div className="form-column-left">
                            <label>Ảnh bìa</label>
                            <div className="image-uploader">
                                <input type="file" id="imageUpload" name="image" onChange={handleImageChange} accept="image/*" />
                                <label htmlFor="imageUpload" className="upload-area">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Xem trước" className="image-preview" />
                                    ) : (
                                        <div className="upload-placeholder">
                                            <UploadCloud size={48} />
                                            <span>Kéo & thả hoặc nhấn để chọn ảnh</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Cột phải: Thông tin */}
                        <div className="form-column-right">
                            <div className="form-group full-width">
                                <label htmlFor="title">Tên sách</label>
                                <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Tác giả</label>
                                <input id="author" type="text" name="author" value={formData.author} onChange={handleChange} required />
                            </div>
                             <div className="form-group">
                                <label htmlFor="nam_xb">Năm xuất bản</label>
                                <input id="nam_xb" type="number" name="nam_xb" value={formData.nam_xb} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="so_luong">Số lượng</label>
                                <input id="so_luong" type="number" name="so_luong" value={formData.so_luong} onChange={handleChange} required />
                            </div>
                            <div className="form-group full-width">
                                <label>Thể loại</label>
                                <div className="category-checkboxes">
                                    <label><input type="checkbox" value="1" onChange={handleCategoryChange} checked={formData.category_ids.includes(1)} /> CNTT</label>
                                    <label><input type="checkbox" value="2" onChange={handleCategoryChange} checked={formData.category_ids.includes(2)} /> Khoa học</label>
                                    <label><input type="checkbox" value="3" onChange={handleCategoryChange} checked={formData.category_ids.includes(3)} /> Văn học</label>
                                    <label><input type="checkbox" value="4" onChange={handleCategoryChange} checked={formData.category_ids.includes(4)} /> Kỹ năng sống</label>
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="description">Mô tả</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>Hủy</button>
                        <button type="submit" className="btn-primary">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookFormModal;