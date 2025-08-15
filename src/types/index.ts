export interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  url?: string;
  [key: string]: any;
}

export interface SearchProps {
  data: SearchResult[] | string; // Array of objects or API endpoint URL
  apiKey?: string | undefined;
  searchType?: "local" | "cloud" | undefined;
  cloudProvider?: "openai" | "cohere" | undefined;
  placeholder?: string | undefined;
  onSelect?: ((result: SearchResult) => void) | undefined;
  renderItem?: ((result: SearchResult) => React.ReactNode) | undefined;
  debounceMs?: number | undefined;
  // Custom class names for styling
  containerClassName?: string | undefined;
  inputClassName?: string | undefined;
  resultsClassName?: string | undefined;
  resultItemClassName?: string | undefined;
  loadingClassName?: string | undefined;
  // Theme customization
  theme?:
    | {
        primaryColor?: string;
        secondaryColor?: string;
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string;
        borderRadius?: string;
      }
    | undefined;
}

export interface SearchHookProps {
  data: SearchResult[] | string;
  apiKey?: string | undefined;
  searchType?: "local" | "cloud" | undefined;
  cloudProvider?: "openai" | "cohere" | undefined;
}

export interface SearchHookReturn {
  query: string;
  results: SearchResult[];
  loading: boolean;
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
}
