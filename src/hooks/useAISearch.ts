import { useState, useEffect, useCallback } from "react";
import { SearchHookProps, SearchHookReturn, SearchResult } from "../types";
import { performLocalSearch } from "../utils/localSearch";
import { performOpenAISearch, performCohereSearch } from "../utils/cloudSearch";

export const useAISearch = ({
  data,
  apiKey,
  searchType = "local",
  cloudProvider = "openai",
}: SearchHookProps): SearchHookReturn => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery);

      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        if (Array.isArray(data)) {
          // Local search
          if (searchType === "local") {
            const localResults = performLocalSearch(data, searchQuery);
            setResults(localResults);
          }
          // Cloud search
          else if (searchType === "cloud" && apiKey) {
            let cloudResults: SearchResult[] = [];

            if (cloudProvider === "openai") {
              cloudResults = await performOpenAISearch(
                data,
                searchQuery,
                apiKey
              );
            } else if (cloudProvider === "cohere") {
              cloudResults = await performCohereSearch(
                data,
                searchQuery,
                apiKey
              );
            }

            setResults(cloudResults);
          } else {
            // Fallback to local search if cloud is configured but no API key
            const localResults = performLocalSearch(data, searchQuery);
            setResults(localResults);
          }
        } else {
          // API endpoint search (simplified for demonstration)
          // In a real implementation, you would fetch from the API endpoint
          console.warn("API endpoint search not implemented in this demo");
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [data, apiKey, searchType, cloudProvider]
  );

  // Debounced search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        search(query);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, search]);

  return {
    query,
    results,
    loading,
    setQuery,
    search,
  };
};
