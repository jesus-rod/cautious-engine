import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const createPrompt = (fileContents: string, topics: string[]) => {
  const topicsString = topics.map((topic) => `"${topic}"`).join(', ');
  return `1. Given the following text: ${fileContents}
  2. Summarize the main topics and describe the relationships between different topics in detail.
  3. Consider the existing topics: ${topicsString}.
  4. If the existing topics are not present in the text, create new topics.
  5. Pay special attention to synonyms, related terms, and context to identify connections between topics. For example, "Vegan" and "Veganism" should be recognized as related and connected.
  6. Provide the output as a JSON object containing four properties:
    - "topics": an array where each element is an object with properties "name" and "occurrences", representing the frequency of each topic mentioned in the text. This will be used as nodes in a graph.
    - "relationships": an array where each element is an object with properties "from", "to", and "occurrences", representing the number of times these topics are mentioned together in the text. This will be used as edges in a graph.
    - "newTopics": an array containing any new topics found in the text that were not in the existing topics list.
    - "summary": a brief summary of what the text is about.
  7. Ensure that related topics are accurately connected based on their contextual usage in the text.
  8. Validate that all relevant topics and their relationships are captured in the response.`;
};

export class LLMService {
  static async runAlgorithm(fileContents: string, topics: string[]): Promise<{ topics: string[]; relationships: string[][] } | null> {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: 'user',
          content: createPrompt(fileContents, topics),
        },
      ],
      model: process.env['OPENAI_MODEL'] ?? 'gpt-3.5-turbo',
      max_tokens: 4000,
      temperature: 0,
    };

    try {
      const response: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
      const messageContent: string | null = response.choices[0].message.content?.trim() ?? '';
      const output = JSON.parse(messageContent ?? '');
      return output;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return null;
    }
  }
}
