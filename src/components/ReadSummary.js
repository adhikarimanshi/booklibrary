const average = (arr) => arr.reduce((sum, val) => sum + val / arr.length, 0);

export default function ReadSummary({ books }) {
  if (books.length === 0) return <p>No books read yet.</p>;

  const avgRating = average(books.map((b) => b.userRating));
  const avgPages = average(books.map((b) => b.pages));

  return (
    <div className="summary">
      <h2>Books You've Read</h2>
      <p>#️⃣ {books.length}</p>
      <p>🌟 Avg Rating: {avgRating.toFixed(2)}</p>
      <p>📄 Avg Pages: {avgPages.toFixed(0)}</p>
    </div>
  );
}
