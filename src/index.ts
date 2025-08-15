export { AISearch } from "./components/AISearch";
export { useAISearch } from "./hooks/useAISearch";
export { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
export { performLocalSearch } from "./utils/localSearch";
export { performOpenAISearch, performCohereSearch } from "./utils/cloudSearch";
export type {
  SearchResult,
  SearchProps,
  SearchHookProps,
  SearchHookReturn,
} from "./types";
