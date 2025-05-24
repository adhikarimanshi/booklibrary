export default function ReadBooksList({ books, onDelete }) {
  return (
    <ul className="list list-read">
      {books.map((b) => (
        <li key={b.key}>
          <h3>{b.title}</h3>
          <p>{b.authors}</p>
          <p>Pages: {b.pages}</p>
          <p>Rating: {b.userRating} ⭐️</p>
          <button className="btn-delete" onClick={() => onDelete(b.key)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
