import React from 'react';
import { SearchResult } from '../types';

interface SearchResultItemProps {
    result: SearchResult;
    isSelected: boolean;
    onClick: () => void;
    highlight?: (text: string) => React.ReactNode;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
    result,
    isSelected,
    onClick,
    highlight
}) => {
    return (
        <div
            className={`search-result-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            role="option"
            aria-selected={isSelected}
        >
            <h3>{highlight ? highlight(result.title) : result.title}</h3>
            {result.description && (
                <p>{highlight ? highlight(result.description) : result.description}</p>
            )}
            {result.url && (
                <small>{result.url}</small>
            )}
        </div>
    );
};