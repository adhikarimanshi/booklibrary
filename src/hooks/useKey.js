import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function handler(e) {
      if (e.key === key) action();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, action]);
}
