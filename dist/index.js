'use strict';

var react = require('react');
var Fuse = require('fuse.js');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Fuse__default = /*#__PURE__*/_interopDefault(Fuse);

// src/components/AISearch.tsx
var fuseOptions = {
  keys: ["title", "description"],
  threshold: 0.3,
  includeScore: true
};
var performLocalSearch = (data, query) => {
  if (!query.trim()) {
    return [];
  }
  const fuse = new Fuse__default.default(data, fuseOptions);
  const results = fuse.search(query);
  return results.slice(0, 10).map((result) => result.item);
};

// src/utils/cloudSearch.ts
var mockEmbed = async (text) => {
  return Array(1536).fill(0).map((_, i) => Math.random() * 2 - 1);
};
var cosineSimilarity = (a, b) => {
  if (a.length !== b.length) {
    throw new Error(
      "Arrays must have the same length for cosine similarity calculation"
    );
  }
  if (a.length === 0) {
    return 0;
  }
  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
  }
  let magnitudeA = 0;
  for (let i = 0; i < a.length; i++) {
    magnitudeA += a[i] * a[i];
  }
  magnitudeA = Math.sqrt(magnitudeA);
  let magnitudeB = 0;
  for (let i = 0; i < b.length; i++) {
    magnitudeB += b[i] * b[i];
  }
  magnitudeB = Math.sqrt(magnitudeB);
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  return dotProduct / (magnitudeA * magnitudeB);
};
var performOpenAISearch = async (data, query, apiKey) => {
  if (!query.trim()) {
    return [];
  }
  try {
    const queryEmbedding = await mockEmbed(query);
    const scoredData = await Promise.all(
      data.map(async (item) => {
        const itemEmbedding = await mockEmbed(
          item.title + " " + (item.description || "")
        );
        const similarity = cosineSimilarity(queryEmbedding, itemEmbedding);
        return { ...item, similarity };
      })
    );
    return scoredData.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
  } catch (error) {
    console.error("OpenAI search error:", error);
    return [];
  }
};
var performCohereSearch = async (data, query, apiKey) => {
  if (!query.trim()) {
    return [];
  }
  try {
    const queryEmbedding = await mockEmbed(query);
    const scoredData = await Promise.all(
      data.map(async (item) => {
        const itemEmbedding = await mockEmbed(
          item.title + " " + (item.description || "")
        );
        const similarity = cosineSimilarity(queryEmbedding, itemEmbedding);
        return { ...item, similarity };
      })
    );
    return scoredData.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
  } catch (error) {
    console.error("Cohere search error:", error);
    return [];
  }
};

// src/hooks/useAISearch.ts
var useAISearch = ({
  data,
  apiKey,
  searchType = "local",
  cloudProvider = "openai"
}) => {
  const [query, setQuery] = react.useState("");
  const [results, setResults] = react.useState([]);
  const [loading, setLoading] = react.useState(false);
  const search = react.useCallback(
    async (searchQuery) => {
      setQuery(searchQuery);
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        if (Array.isArray(data)) {
          if (searchType === "local") {
            const localResults = performLocalSearch(data, searchQuery);
            setResults(localResults);
          } else if (searchType === "cloud" && apiKey) {
            let cloudResults = [];
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
            const localResults = performLocalSearch(data, searchQuery);
            setResults(localResults);
          }
        } else {
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
  react.useEffect(() => {
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
    search
  };
};
var useKeyboardNavigation = (results) => {
  const [selectedIndex, setSelectedIndex] = react.useState(-1);
  const handleKeyDown = react.useCallback(
    (e) => {
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
  const resetSelection = react.useCallback(() => {
    setSelectedIndex(-1);
  }, []);
  return {
    selectedIndex,
    handleKeyDown,
    resetSelection,
    setSelectedIndex
  };
};
var SearchResultItem = ({
  result,
  isSelected,
  onClick,
  highlight
}) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: `search-result-item ${isSelected ? "selected" : ""}`,
      onClick,
      role: "option",
      "aria-selected": isSelected,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { children: highlight ? highlight(result.title) : result.title }),
        result.description && /* @__PURE__ */ jsxRuntime.jsx("p", { children: highlight ? highlight(result.description) : result.description }),
        result.url && /* @__PURE__ */ jsxRuntime.jsx("small", { children: result.url })
      ]
    }
  );
};
var SearchResults = ({
  results,
  selectedIndex,
  onSelect,
  highlight
}) => {
  if (results.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "search-results", role: "listbox", children: results.map((result, index) => /* @__PURE__ */ jsxRuntime.jsx(
    SearchResultItem,
    {
      result,
      isSelected: index === selectedIndex,
      onClick: () => onSelect(result),
      highlight
    },
    result.id
  )) });
};
var AISearch = ({
  data,
  apiKey,
  searchType = "local",
  cloudProvider = "openai",
  placeholder = "Search...",
  onSelect,
  renderItem
}) => {
  const {
    query,
    results,
    loading,
    setQuery
  } = useAISearch({
    data,
    apiKey,
    searchType,
    cloudProvider
  });
  const {
    selectedIndex,
    handleKeyDown,
    resetSelection
  } = useKeyboardNavigation(results);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  const handleResultSelect = (result) => {
    if (onSelect) {
      onSelect(result);
    }
    setQuery("");
    resetSelection();
  };
  const handleKeyDownInternal = (e) => {
    handleKeyDown(e);
    if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      handleResultSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      setQuery("");
      resetSelection();
    }
  };
  const highlight = react.useMemo(() => {
    return (text) => {
      if (!query) return text;
      const regex = new RegExp(`(${query})`, "gi");
      const parts = text.split(regex);
      return parts.map(
        (part, index) => regex.test(part) ? /* @__PURE__ */ jsxRuntime.jsx("mark", { children: part }, index) : part
      );
    };
  }, [query]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ai-search-container", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        type: "text",
        value: query,
        onChange: handleInputChange,
        onKeyDown: handleKeyDownInternal,
        placeholder,
        className: "ai-search-input",
        "aria-autocomplete": "list",
        "aria-controls": "search-results",
        "aria-expanded": results.length > 0
      }
    ),
    loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "search-loading", children: "Searching..." }),
    /* @__PURE__ */ jsxRuntime.jsx(
      SearchResults,
      {
        results,
        selectedIndex,
        onSelect: handleResultSelect,
        highlight
      }
    ),
    renderItem && results.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "custom-results", children: results.map((result, index) => /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: index === selectedIndex ? "selected" : "",
        onClick: () => handleResultSelect(result),
        children: renderItem(result)
      },
      result.id
    )) })
  ] });
};

exports.AISearch = AISearch;
exports.performCohereSearch = performCohereSearch;
exports.performLocalSearch = performLocalSearch;
exports.performOpenAISearch = performOpenAISearch;
exports.useAISearch = useAISearch;
exports.useKeyboardNavigation = useKeyboardNavigation;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map