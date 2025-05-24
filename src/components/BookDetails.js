import { useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "../hooks/useKey";
import { useBookDetails } from "../hooks/useBookDetails";

export default function BookDetails({
  selectedId,
  onAddReadBook,
  onClose,
  readBooks,
}) {
  const { book, isLoading, error, countRef } = useBookDetails(selectedId);
  const [userRating, setUserRating] = useState(0);

  useKey("Escape", onClose);

  const isRead = readBooks.some((b) => b.key === selectedId);
  const existingRating = readBooks.find(
    (b) => b.key === selectedId
  )?.userRating;

  function handleAdd() {
    const newRead = {
      key: selectedId,
      title: book.title,
      authors: book.authors?.map((a) => a.name).join(", "),
      pages: book.number_of_pages,
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddReadBook(newRead);
    onClose();
  }

  if (isLoading) return <p>Loading details...</p>;
  if (error) return <p className="error">⛔ {error}</p>;
  if (!book) return null;

  return (
    <div className="details large-details">
      <button className="btn-back" onClick={onClose}>
        &larr;
      </button>
      <h2>{book.title}</h2>
      <p>By {book.authors?.map((a) => a.name).join(", ")}</p>
      <p>Pages: {book.number_of_pages || "N/A"}</p>
      {!isRead ? (
        <div className="rating">
          <StarRating
            maxRating={10}
            size={24}
            onSetRating={(r) => {
              setUserRating(r);
              if (r > 0) countRef.current++;
            }}
          />
          {userRating > 0 && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to Read
            </button>
          )}
        </div>
      ) : (
        <p>Your rating: {existingRating} ⭐️</p>
      )}
      <p>{book.description?.value || book.description || "No description."}</p>
    </div>
  );
}
