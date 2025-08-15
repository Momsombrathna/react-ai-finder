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
    renderItem,
    containerClassName,
    inputClassName,
    resultsClassName,
    resultItemClassName,
    loadingClassName,
    theme
}) => {
    // Generate CSS variables from theme prop
    const themeStyle = useMemo(() => {
        if (!theme) return {};
        const style: Record<string, string> = {};
        if (theme.primaryColor) style['--ai-search-primary-color'] = theme.primaryColor;
        if (theme.secondaryColor) style['--ai-search-secondary-color'] = theme.secondaryColor;
        if (theme.backgroundColor) style['--ai-search-background-color'] = theme.backgroundColor;
        if (theme.borderColor) style['--ai-search-border-color'] = theme.borderColor;
        if (theme.textColor) style['--ai-search-text-color'] = theme.textColor;
        if (theme.borderRadius) style['--ai-search-border-radius'] = theme.borderRadius;
        return style;
    }, [theme]);

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
        <div
            className={`ai-search-container ${containerClassName || ''}`}
            style={themeStyle}
        >
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDownInternal}
                placeholder={placeholder}
                className={`ai-search-input ${inputClassName || ''}`}
                aria-autocomplete="list"
                aria-controls="search-results"
                aria-expanded={results.length > 0}
            />

            {loading && (
                <div className={`search-loading ${loadingClassName || ''}`}>Searching...</div>
            )}

            <SearchResults
                results={results}
                selectedIndex={selectedIndex}
                onSelect={handleResultSelect}
                highlight={highlight}
                containerClassName={resultsClassName}
                itemClassName={resultItemClassName}
            />

            {renderItem && results.length > 0 && (
                <div className={`custom-results ${resultsClassName || ''}`}>
                    {results.map((result, index) => (
                        <div
                            key={result.id}
                            className={`${index === selectedIndex ? 'selected' : ''} ${resultItemClassName || ''}`}
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