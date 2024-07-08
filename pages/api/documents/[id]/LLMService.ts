import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const createPrompt = (fileContents: string, topics: string[]) => {
  let topicsString = topics.map((topic) => `"${topic}"`).join(", ");
  return `
  1. Given the following text: ${fileContents} 
  2. Summarize the main topics using and their relationships.
  3. Consider the existing topics: ${topicsString}
  4. The topics are not case sensitive. Compare them as lowercase.
  5. If the existing topics are not present in the text, create new topics.
  6. Provide the output as a JSON containing three properties, one named "topics" which contains an array with the topic "name" and the times its "occurrences". This property will represent the nodes in a graph. 
  7. Another property named "relationships" which will be used as edges in a graph. The edges should be represented as an array where each node contains an object with properties "from" and "to" and also a property "occurrences" to state how many times that connection ocurred in the text.
  8. The relationships should be between the topics and the occurrences should be the number of times the topics are mentioned together in the text.
  9. Lastly, a property named "newTopics" which will contain the new topics found in the text.`;
}

// Make async call to database
// const getTopics = async () => {

// }


export class LLMService {
  static async runAlgorithm(fileContents: string, topics: string[]): Promise<{topics: string[]; relationships: string[][];} | null> {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: 'user',
          content: createPrompt(fileContents, topics),
        }
      ],
      model: process.env['OPENAI_MODEL'] ?? 'gpt-3.5-turbo',
      max_tokens: 4000,
      temperature: 0,
    };

    try {
      const response: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
      const messageContent: string | null = response.choices[0].message.content?.trim() ?? "";
      const output = JSON.parse(messageContent ?? "");
      return output;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return null;
    }
  }
}
