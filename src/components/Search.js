import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputRef = useRef(null);
  useKey("Enter", () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current.focus();
      setQuery("");
    }
  });

  return (
    <div className="search-container">
      <span className="search-icon" role="img" aria-label="search">
        🔍
      </span>
      <input
        className="search"
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
}
