import React from 'react';
import { AISearch } from '../../src/components/AISearch';
import { mockData } from './mockData';
import '../../src/components/AISearch.css';

function App() {
    const handleSelect = (result: any) => {
        alert(`Selected: ${result.title}`);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>AI Search Component Demo</h1>
            <p>Try searching for terms like "React", "TypeScript", "CSS", etc.</p>
            <AISearch
                data={mockData}
                onSelect={handleSelect}
                placeholder="Search documentation..."
            />
        </div>
    );
}

export default App;