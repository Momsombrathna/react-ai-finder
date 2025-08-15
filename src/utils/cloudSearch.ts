import { SearchResult } from "../types";

// Mock embedding function for demonstration
// In a real implementation, you would use the actual API
const mockEmbed = async (text: string): Promise<number[]> => {
  // This is a mock implementation
  // In reality, you would call the OpenAI or Cohere API
  return Array(1536)
    .fill(0)
    .map((_, i) => Math.random() * 2 - 1);
};

// Simple cosine similarity function
const cosineSimilarity = (a: number[], b: number[]): number => {
  // Validate that arrays have the same length
  if (a.length !== b.length) {
    throw new Error(
      "Arrays must have the same length for cosine similarity calculation"
    );
  }

  // Handle empty arrays
  if (a.length === 0) {
    return 0;
  }

  // Calculate dot product using a for loop with type assertion to avoid TypeScript issues
  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += (a[i] as number) * (b[i] as number);
  }

  // Calculate magnitudes using for loops with type assertion
  let magnitudeA = 0;
  for (let i = 0; i < a.length; i++) {
    magnitudeA += (a[i] as number) * (a[i] as number);
  }
  magnitudeA = Math.sqrt(magnitudeA);

  let magnitudeB = 0;
  for (let i = 0; i < b.length; i++) {
    magnitudeB += (b[i] as number) * (b[i] as number);
  }
  magnitudeB = Math.sqrt(magnitudeB);

  // Handle zero magnitude cases
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};

export const performOpenAISearch = async (
  data: SearchResult[],
  query: string,
  apiKey: string
): Promise<SearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    // In a real implementation, you would use:
    // const openai = new OpenAI({ apiKey });

    // Mock implementation for demonstration
    const queryEmbedding = await mockEmbed(query);

    // Calculate similarity scores for all items
    const scoredData = await Promise.all(
      data.map(async (item) => {
        const itemEmbedding = await mockEmbed(
          item.title + " " + (item.description || "")
        );
        const similarity = cosineSimilarity(queryEmbedding, itemEmbedding);
        return { ...item, similarity };
      })
    );

    // Sort by similarity and return top 10
    return scoredData.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
  } catch (error) {
    console.error("OpenAI search error:", error);
    return [];
  }
};

export const performCohereSearch = async (
  data: SearchResult[],
  query: string,
  apiKey: string
): Promise<SearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    // In a real implementation, you would use:
    // const cohere = new CohereClient({ token: apiKey });

    // Mock implementation for demonstration
    const queryEmbedding = await mockEmbed(query);

    // Calculate similarity scores for all items
    const scoredData = await Promise.all(
      data.map(async (item) => {
        const itemEmbedding = await mockEmbed(
          item.title + " " + (item.description || "")
        );
        const similarity = cosineSimilarity(queryEmbedding, itemEmbedding);
        return { ...item, similarity };
      })
    );

    // Sort by similarity and return top 10
    return scoredData.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
  } catch (error) {
    console.error("Cohere search error:", error);
    return [];
  }
};
