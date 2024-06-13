import {PrismaClient} from '@prisma/client';
import fs from 'fs';
import {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import path from 'path';

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const prompt = (fileContents: string) => {
  return `
  Analyze the following text and summarize the main topics and their relationships. Provide the output as a JSON containing two properties, one named "topics" which contains an array with the topic name and the times it occurred. This property will represent the nodes in a graph. And also another property named "relationships" which will be used as edges in a graph. The edges should be represented as an array where each node contains an object with properties "from" and "to" and also a property "ocurrences" to state how many times that connection ocurred in the text. If the connections occurs in the opposite direction, don't add a new "from" and "to" entry. Instead increase the ocurrences in the existing edge. Consider relationships between different nodes too.
  ${fileContents}
  `;
}

async function runLLMAlgorithm(fileContents: string): Promise<{topics: string[], relationships: string[][]} | null> {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: 'user',
        content: prompt(fileContents),
      }
    ],
    model: process.env['OPENAI_MODEL_B'] ?? 'gpt-3.5-turbo',
    max_tokens: 3000,
    temperature: 0,
  };

  try {
    const response: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
    const messageContent: string | null = response.choices[0].message.content?.trim() ?? "";
    console.log("this ok?", messageContent)
    const output = JSON.parse(messageContent ?? "");
    return output;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("handling process request")
  const {id} = req.query;

  if (req.method === 'POST') {
    try {
      const file = await prisma.fileMetadata.findUnique({
        where: {id: String(id)},
      });

      if (!file) {
        res.status(404).json({message: 'File not found'});
        return;
      }
      const fileName = file.filename;
      const uploadDir = path.join(process.cwd(), 'uploads');
      const filePath = path.join(uploadDir, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf-8');

      // Use the file content as input for the LLM algorithm
      const processedData = await runLLMAlgorithm(fileContents);
      if (!processedData) {
        res.status(500).json({message: 'Failed to process the file content'});
        return;
      }

      // Update the document with the processed text
      const updatedFile = await prisma.fileMetadata.update({
        where: {id: String(id)},
        data: {
          analysisResult: JSON.stringify(processedData),
        },
      });

      res.status(200).json(updatedFile);
    } catch (error) {
      console.error('Error processing file:', error); // eslint-disable-line no-console
      res.status(500).json({message: 'Error processing file'});
    }
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}
