import { useState, useEffect } from "react";

const DEFAULT_QUERY = "bestseller";

export function useBooks(query, page) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [numFound, setNumFound] = useState(0);

  useEffect(() => {
    const effectiveQuery = query.trim() || DEFAULT_QUERY;
    const controller = new AbortController();

    async function fetchBooks() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            effectiveQuery
          )}&page=${page}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data.docs.slice(0, 10));
        setNumFound(data.numFound);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
    return () => controller.abort();
  }, [query, page]);

  return { books, isLoading, error, numFound };
}
