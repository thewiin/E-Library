import React, { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await Apis.get(endpoints.books, {
        params: { q, page, per_page: perPage },
      });
      setBooks(res.data.items);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error("Fetch books error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [q, page]);

  return (
    <div className="container py-4">
      <h1 className="mb-4">E-Books Library</h1>

      {/* Search */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search books..."
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <button className="btn btn-primary" onClick={fetchBooks}>
          Search
        </button>
      </div>

      {/* Book List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book.id} className="col-6 col-md-3 mb-4">
              <div className="card h-100">
                {book.image && (
                  <img
                    src={`${book.image}`}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text text-muted">{book.author}</p>
                  <a href={`/books/${book.id}`} className="btn btn-outline-primary mt-auto">
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              Page {page} / {totalPages}
            </span>
          </li>
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
