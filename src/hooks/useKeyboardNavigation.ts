import { useState, useCallback } from "react";
import { SearchResult } from "../types";

export const useKeyboardNavigation = (results: SearchResult[]) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      }
    },
    [results.length]
  );

  const resetSelection = useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  return {
    selectedIndex,
    handleKeyDown,
    resetSelection,
    setSelectedIndex,
  };
};
