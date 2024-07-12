import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseHandler } from '../../DatabaseHandler';
import { FileHandler } from '../../FileHandler';
import { LLMService } from '../../LLMService';

// Retrieve document by ID
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing id parameter' });
  }

  try {
    const document = await DatabaseHandler.getFileById(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving files' });
  }
};

// Delete document from filesystem and database
const handleDeleteRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const file = await DatabaseHandler.getFileById(String(id));

    if (!file) {
      res.status(404).json({ message: 'File not found' });
      return;
    }

    const fileName = file.filename;
    await FileHandler.deleteFile(fileName);
    await DatabaseHandler.deleteFileById(String(id));

    res.status(204).send('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Error deleting file' });
  }
};

// Process file content and update the document with the LLM Response
const handleUpdateRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const file = await DatabaseHandler.getFileById(String(id));
    const topics = (await DatabaseHandler.getTopics()).map((topic) => topic.name);

    if (!file) {
      res.status(404).json({ message: 'File not found' });
      return;
    }

    const fileName = file.filename;
    const filePath = FileHandler.getFilePath(fileName);
    const fileContents = FileHandler.readFileContents(filePath);

    // Use the file content as input for the LLM algorithm
    const processedData = await LLMService.runAlgorithm(fileContents, topics);
    if (!processedData) {
      res.status(500).json({ message: 'Failed to process the file content' });
      return;
    }

    const updatedFile = await DatabaseHandler.updateFileAnalysisResult(String(id), JSON.stringify(processedData));
    res.status(200).json(updatedFile);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    await handleGetRequest(req, res);
  } else if (req.method === 'POST') {
    await handleUpdateRequest(req, res);
  } else if (req.method === 'DELETE') {
    await handleDeleteRequest(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
