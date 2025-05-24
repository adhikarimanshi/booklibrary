import { useState } from "react";

export default function StarRating({ maxRating, size, onSetRating }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  function handleClick(rating) {
    setSelected(rating);
    onSetRating(rating);
  }

  return (
    <div style={{ display: "flex", gap: "0.25rem" }}>
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((r) => (
        <span
          key={r}
          style={{ fontSize: size, cursor: "pointer" }}
          onMouseEnter={() => setHovered(r)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleClick(r)}
        >
          {r <= (hovered || selected) ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
