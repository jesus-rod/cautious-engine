import OpenAI from "openai";


export const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const createPrompt = (fileContents: string) => {
  return `
  Analyze the following text and summarize the main topics and their relationships. Provide the output as a JSON containing two properties, one named "topics" which contains an array with the topic name and the times it occurred. This property will represent the nodes in a graph. And also another property named "relationships" which will be used as edges in a graph. The edges should be represented as an array where each node contains an object with properties "from" and "to" and also a property "ocurrences" to state how many times that connection ocurred in the text. If the connections occurs in the opposite direction, don't add a new "from" and "to" entry and do not increase the ocurrences in the existing relationship. Consider relationships between different nodes too.
  ${fileContents}
  `;
}

export class LLMService {
  static async runAlgorithm(fileContents: string): Promise<{topics: string[]; relationships: string[][];} | null> {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: 'user',
          content: createPrompt(fileContents),
        }
      ],
      model: process.env['OPENAI_MODEL'] ?? 'gpt-3.5-turbo',
      max_tokens: 3000,
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
