import * as react from 'react';
import react__default from 'react';

interface SearchResult {
    id: string | number;
    title: string;
    description?: string;
    url?: string;
    [key: string]: any;
}
interface SearchProps {
    data: SearchResult[] | string;
    apiKey?: string | undefined;
    searchType?: "local" | "cloud" | undefined;
    cloudProvider?: "openai" | "cohere" | undefined;
    placeholder?: string | undefined;
    onSelect?: ((result: SearchResult) => void) | undefined;
    renderItem?: ((result: SearchResult) => React.ReactNode) | undefined;
    debounceMs?: number | undefined;
}
interface SearchHookProps {
    data: SearchResult[] | string;
    apiKey?: string | undefined;
    searchType?: "local" | "cloud" | undefined;
    cloudProvider?: "openai" | "cohere" | undefined;
}
interface SearchHookReturn {
    query: string;
    results: SearchResult[];
    loading: boolean;
    setQuery: (query: string) => void;
    search: (query: string) => Promise<void>;
}

declare const AISearch: react__default.FC<SearchProps>;

declare const useAISearch: ({ data, apiKey, searchType, cloudProvider, }: SearchHookProps) => SearchHookReturn;

declare const useKeyboardNavigation: (results: SearchResult[]) => {
    selectedIndex: number;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    resetSelection: () => void;
    setSelectedIndex: react.Dispatch<react.SetStateAction<number>>;
};

declare const performLocalSearch: (data: SearchResult[], query: string) => SearchResult[];

declare const performOpenAISearch: (data: SearchResult[], query: string, _apiKey: string) => Promise<SearchResult[]>;
declare const performCohereSearch: (data: SearchResult[], query: string, _apiKey: string) => Promise<SearchResult[]>;

export { AISearch, type SearchHookProps, type SearchHookReturn, type SearchProps, type SearchResult, performCohereSearch, performLocalSearch, performOpenAISearch, useAISearch, useKeyboardNavigation };
