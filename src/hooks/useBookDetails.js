import { useState, useEffect, useRef } from "react";

const cache = {};

export function useBookDetails(selectedId) {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const countRef = useRef(0);

  useEffect(() => {
    if (!selectedId) return;
    async function getDetails() {
      setIsLoading(true);
      setError("");

      if (cache[selectedId]) {
        setBook(cache[selectedId]);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://openlibrary.org${selectedId}.json`);
        if (!res.ok) throw new Error("Failed to fetch details");
        const data = await res.json();
        cache[selectedId] = data;
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getDetails();
  }, [selectedId]);

  return { book, isLoading, error, countRef };
}
