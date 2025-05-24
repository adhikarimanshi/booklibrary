export default function BookList({ books, onSelectBook }) {
  return (
    <ul className="list list-books">
      {books.map((book) => (
        <li key={book.key} onClick={() => onSelectBook(book.key)}>
          <img
            src={
              book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/128x195.png?text=No+Cover"
            }
            alt={`${book.title} cover`}
          />
          <div>
            <h3>{book.title}</h3>
            <p>{book.author_name?.[0]}</p>
            <p>{book.first_publish_year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
