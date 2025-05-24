import { useState } from "react";
import { useBooks } from "./hooks/useBooks";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Search from "./components/Search";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import ReadSummary from "./components/ReadSummary";
import ReadBooksList from "./components/ReadBooksList";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { books, isLoading, error, numFound } = useBooks(query, page);
  const [readBooks, setReadBooks] = useLocalStorageState([], "readBooks");

  function handleSelectBook(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleAddReadBook(book) {
    setReadBooks((prev) => [...prev, book]);
  }

  function handleDeleteReadBook(id) {
    setReadBooks((prev) => prev.filter((book) => book.key !== id));
  }

  const totalPages = Math.ceil(numFound / 10);

  return (
    <div className="app">
      <header className="header">
        <h1>📚 useLibrary</h1>
        <Search query={query} setQuery={setQuery} />
      </header>

      <main className="main">
        <section className="results">
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">⛔ {error}</p>}
          {!isLoading && !error && (
            <>
              <BookList books={books} onSelectBook={handleSelectBook} />
              <div className="pagination">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>

        <section className="details">
          {selectedId ? (
            <BookDetails
              selectedId={selectedId}
              onAddReadBook={handleAddReadBook}
              onClose={() => setSelectedId(null)}
              readBooks={readBooks}
            />
          ) : (
            <>
              <ReadSummary books={readBooks} />
              <ReadBooksList
                books={readBooks}
                onDelete={handleDeleteReadBook}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
