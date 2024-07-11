import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseHandler } from '../../DatabaseHandler';

// Dependency Injection and Separation of Concerns
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
    console.error(error); // Log the error
    res.status(500).json({ message: 'Error retrieving files' });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    await handleGetRequest(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
