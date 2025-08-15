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

## API

### Props

| Prop            | Type                         | Default       | Description                               |
| --------------- | ---------------------------- | ------------- | ----------------------------------------- |
| `data`          | `SearchResult[]` or `string` | required      | Array of search items or API endpoint URL |
| `apiKey`        | `string`                     | `undefined`   | API key for cloud providers               |
| `searchType`    | `'local'` or `'cloud'`       | `'local'`     | Search type                               |
| `cloudProvider` | `'openai'` or `'cohere'`     | `'openai'`    | Cloud provider for AI search              |
| `placeholder`   | `string`                     | `'Search...'` | Input placeholder text                    |
| `onSelect`      | `function`                   | `undefined`   | Callback when item is selected            |
| `renderItem`    | `function`                   | `undefined`   | Custom renderer for results               |
| `debounceMs`    | `number`                     | `300`         | Debounce time in milliseconds             |

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
