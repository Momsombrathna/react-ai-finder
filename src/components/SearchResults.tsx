import React from 'react';
import { SearchResult } from '../types';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultsProps {
    results: SearchResult[];
    selectedIndex: number;
    onSelect: (result: SearchResult) => void;
    highlight: (text: string) => React.ReactNode;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
    results,
    selectedIndex,
    onSelect,
    highlight
}) => {
    if (results.length === 0) {
        return null;
    }

    return (
        <div className="search-results" role="listbox">
            {results.map((result, index) => (
                <SearchResultItem
                    key={result.id}
                    result={result}
                    isSelected={index === selectedIndex}
                    onClick={() => onSelect(result)}
                    highlight={highlight}
                />
            ))}
        </div>
    );
};