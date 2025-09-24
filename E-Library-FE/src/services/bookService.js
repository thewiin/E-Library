import Apis from "../configs/Apis"; // Import instance Axios đã cấu hình sẵn

// Hàm lấy tất cả sách
export const getAllBooks = () => {
    return Apis.get("/api/books");
};

export const createBook = (formData) => {
    return Apis.post("/api/books", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateBook = (bookId, formData) => {
    return Apis.put(`/api/books/${bookId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteBook = (bookId) => {
    return Apis.delete(`/api/books/${bookId}`);
};