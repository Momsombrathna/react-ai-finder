import React from 'react';
import { AISearch } from '../../src/components/AISearch';
import { mockData } from './mockData';
import '../../src/components/AISearch.css';

// Custom CSS for demonstration
const customStyles = `
.my-custom-container {
  max-width: 100%;
}

.my-custom-input {
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 25px;
  padding: 15px 20px;
  font-size: 18px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.my-custom-input:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.25);
}

.my-custom-results {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.my-custom-item {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  transition: all 0.2s ease;
}

.my-custom-item:hover {
  background-color: #fff9f9;
  transform: translateX(5px);
}

.my-custom-item h3 {
  color: #333;
  font-size: 18px;
}

.my-custom-item p {
  color: #666;
  font-size: 15px;
}

.my-custom-item small {
  color: #999;
  font-size: 13px;
}
`;

// Inject custom styles into the document head
const styleElement = document.createElement('style');
styleElement.textContent = customStyles;
document.head.appendChild(styleElement);

function App() {
    const handleSelect = (result: any) => {
        alert(`Selected: ${result.title}`);
    };

    // Example of custom theme
    const customTheme = {
        primaryColor: '#ff6b6b',
        secondaryColor: '#4ecdc4',
        backgroundColor: '#f8f9fa',
        borderColor: '#dee2e6',
        textColor: '#343a40',
        borderRadius: '12px'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>AI Search Component Demo</h1>
            <p>Try searching for terms like "React", "TypeScript", "CSS", etc.</p>

            <h2>Default Style</h2>
            <AISearch
                data={mockData}
                onSelect={handleSelect}
                placeholder="Search documentation..."
            />

            <h2 style={{ marginTop: '40px' }}>Custom Styled Version</h2>
            <AISearch
                data={mockData}
                onSelect={handleSelect}
                placeholder="Search with custom styles..."
                theme={customTheme}
                containerClassName="my-custom-container"
                inputClassName="my-custom-input"
                resultsClassName="my-custom-results"
                resultItemClassName="my-custom-item"
            />
        </div>
    );
}

export default App;