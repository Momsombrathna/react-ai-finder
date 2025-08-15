import Fuse from "fuse.js";
import { SearchResult } from "../types";

const fuseOptions = {
  keys: ["title", "description"],
  threshold: 0.3,
  includeScore: true,
};

export const performLocalSearch = (
  data: SearchResult[],
  query: string
): SearchResult[] => {
  if (!query.trim()) {
    return [];
  }

  const fuse = new Fuse(data, fuseOptions);
  const results = fuse.search(query);

  // Return top 10 results
  return results.slice(0, 10).map((result) => result.item);
};
