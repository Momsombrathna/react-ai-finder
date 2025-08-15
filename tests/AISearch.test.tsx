import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { AISearch } from '../src/components/AISearch';

// Mock data for testing
const mockData = [
    { id: 1, title: 'Apple', description: 'A red fruit' },
    { id: 2, title: 'Banana', description: 'A yellow fruit' },
    { id: 3, title: 'Orange', description: 'An orange fruit' },
];

describe('AISearch', () => {
    it('renders without crashing', () => {
        render(<AISearch data={mockData} />);
        expect(screen.getByPlaceholderText('Search...')).toBeDefined();
    });

    it('displays search results when typing', async () => {
        render(<AISearch data={mockData} />);

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'Apple' } });

        // Wait for results to appear
        expect(await screen.findByText('Apple')).toBeDefined();
    });

    it('calls onSelect when a result is clicked', async () => {
        const onSelectMock = vi.fn();
        render(<AISearch data={mockData} onSelect={onSelectMock} />);

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'Apple' } });

        const result = await screen.findByText('Apple');
        fireEvent.click(result);

        expect(onSelectMock).toHaveBeenCalledWith(mockData[0]);
    });
});