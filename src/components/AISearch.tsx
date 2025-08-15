import React, { useMemo } from 'react';
import { SearchProps, SearchResult } from '../types';
import { useAISearch } from '../hooks/useAISearch';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { SearchResults } from './SearchResults';
import './AISearch.css';

export const AISearch: React.FC<SearchProps> = ({
    data,
    apiKey,
    searchType = 'local',
    cloudProvider = 'openai',
    placeholder = 'Search...',
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleResultSelect = (result: SearchResult) => {
        if (onSelect) {
            onSelect(result);
        }
        setQuery('');
        resetSelection();
    };

    const handleKeyDownInternal = (e: React.KeyboardEvent) => {
        handleKeyDown(e);

        if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
            e.preventDefault();
            handleResultSelect(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            setQuery('');
            resetSelection();
        }
    };

    // Simple highlighting function
    const highlight = useMemo(() => {
        return (text: string) => {
            if (!query) return text;

            const regex = new RegExp(`(${query})`, 'gi');
            const parts = text.split(regex);

            return parts.map((part, index) =>
                regex.test(part) ? <mark key={index}>{part}</mark> : part
            );
        };
    }, [query]);

    return (
        <div className="ai-search-container">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDownInternal}
                placeholder={placeholder}
                className="ai-search-input"
                aria-autocomplete="list"
                aria-controls="search-results"
                aria-expanded={results.length > 0}
            />

            {loading && (
                <div className="search-loading">Searching...</div>
            )}

            <SearchResults
                results={results}
                selectedIndex={selectedIndex}
                onSelect={handleResultSelect}
                highlight={highlight}
            />

            {renderItem && results.length > 0 && (
                <div className="custom-results">
                    {results.map((result, index) => (
                        <div
                            key={result.id}
                            className={index === selectedIndex ? 'selected' : ''}
                            onClick={() => handleResultSelect(result)}
                        >
                            {renderItem(result)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};