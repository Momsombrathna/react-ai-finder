# React AI Finder

A plug-and-play React component for AI-enhanced search with local fuzzy search and cloud AI API support.

## Features

- 🚀 **Plug-and-play**: Just import and use
- 🔍 **AI-enhanced matching**: Local fuzzy search or cloud AI APIs
- 💡 **Autocomplete & Suggestions**: Real-time search as you type
- ⌨️ **Keyboard navigation**: Arrow keys and enter support
- 🎨 **Custom rendering**: Define how results look
- 🌐 **Multiple data sources**: Works with datasets or API endpoints

## Installation

```bash
npm install react-ai-finder
```

## Usage

### Basic Usage

```jsx
import { AISearch } from "react-ai-finder";
import "react-ai-finder/dist/style.css";

const App = () => {
  const data = [
    { id: 1, title: "Apple", description: "A red fruit" },
    { id: 2, title: "Banana", description: "A yellow fruit" },
    { id: 3, title: "Orange", description: "An orange fruit" },
  ];

  const handleSelect = (result) => {
    console.log("Selected:", result);
  };

  return (
    <AISearch
      data={data}
      onSelect={handleSelect}
      placeholder="Search fruits..."
    />
  );
};
```

### Local Fuzzy Search

```jsx
import { AISearch } from "react-ai-finder";

const App = () => {
  const data = [
    { id: 1, title: "Apple", description: "A red fruit" },
    { id: 2, title: "Banana", description: "A yellow fruit" },
  ];

  return <AISearch data={data} searchType="local" />;
};
```

### Cloud AI Search

```jsx
import { AISearch } from "react-ai-finder";

const App = () => {
  const data = [
    { id: 1, title: "Apple", description: "A red fruit" },
    { id: 2, title: "Banana", description: "A yellow fruit" },
  ];

  return (
    <AISearch
      data={data}
      searchType="cloud"
      cloudProvider="openai"
      apiKey="your-openai-api-key"
    />
  );
};
```

### Custom Rendering

```jsx
import { AISearch } from "react-ai-finder";

const App = () => {
  const data = [
    { id: 1, title: "Apple", description: "A red fruit" },
    { id: 2, title: "Banana", description: "A yellow fruit" },
  ];

  const renderCustomItem = (result) => (
    <div style={{ padding: "10px", border: "1px solid #ccc" }}>
      <h3>{result.title}</h3>
      <p>{result.description}</p>
    </div>
  );

  return <AISearch data={data} renderItem={renderCustomItem} />;
};
```

### Styling Customization

The component can be customized in multiple ways:

#### 1. CSS Variables Theme

You can customize the component's theme using CSS variables:

```jsx
import { AISearch } from "react-ai-finder";
import "react-ai-finder/dist/style.css";

const App = () => {
  const customTheme = {
    primaryColor: "#ff6b6b",
    secondaryColor: "#4ecdc4",
    backgroundColor: "#f8f9fa",
    borderColor: "#dee2e6",
    textColor: "#343a40",
    borderRadius: "12px",
  };

  return <AISearch data={data} theme={customTheme} />;
};
```

Available theme properties:

- `primaryColor`: Main color for focus states and highlights
- `secondaryColor`: Color for secondary text and elements
- `backgroundColor`: Background color for input and results
- `borderColor`: Border color for input and results
- `textColor`: Main text color
- `borderRadius`: Border radius for rounded corners

#### 2. Custom CSS Classes

For more advanced customization, you can provide custom CSS classes:

```jsx
<AISearch
  data={data}
  containerClassName="my-custom-container"
  inputClassName="my-custom-input"
  resultsClassName="my-custom-results"
  resultItemClassName="my-custom-item"
  loadingClassName="my-custom-loading"
/>
```

Example CSS:

```css
.my-custom-container {
  max-width: 100%;
}

.my-custom-input {
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 25px;
  padding: 15px 20px;
  font-size: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.my-custom-input:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.25);
}

.my-custom-results {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
```

## API

### Props

| Prop                  | Type                         | Default       | Description                                                                                                                     |
| --------------------- | ---------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `data`                | `SearchResult[]` or `string` | required      | Array of search items or API endpoint URL                                                                                       |
| `apiKey`              | `string`                     | `undefined`   | API key for cloud providers                                                                                                     |
| `searchType`          | `'local'` or `'cloud'`       | `'local'`     | Search type                                                                                                                     |
| `cloudProvider`       | `'openai'` or `'cohere'`     | `'openai'`    | Cloud provider for AI search                                                                                                    |
| `placeholder`         | `string`                     | `'Search...'` | Input placeholder text                                                                                                          |
| `onSelect`            | `function`                   | `undefined`   | Callback when item is selected                                                                                                  |
| `renderItem`          | `function`                   | `undefined`   | Custom renderer for results                                                                                                     |
| `debounceMs`          | `number`                     | `300`         | Debounce time in milliseconds                                                                                                   |
| `containerClassName`  | `string`                     | `undefined`   | Custom class name for the container                                                                                             |
| `inputClassName`      | `string`                     | `undefined`   | Custom class name for the input element                                                                                         |
| `resultsClassName`    | `string`                     | `undefined`   | Custom class name for the results container                                                                                     |
| `resultItemClassName` | `string`                     | `undefined`   | Custom class name for result items                                                                                              |
| `loadingClassName`    | `string`                     | `undefined`   | Custom class name for the loading indicator                                                                                     |
| `theme`               | `object`                     | `undefined`   | Theme customization object with properties: primaryColor, secondaryColor, backgroundColor, borderColor, textColor, borderRadius |

### Types

```typescript
interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  url?: string;
  [key: string]: any;
}
```

## Development

### Building

```bash
npm run build
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm run test
```

## License

MIT
