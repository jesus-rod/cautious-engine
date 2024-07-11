import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseHandler } from '../../DatabaseHandler';
import { FileHandler } from '../../FileHandler';

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    await handlePostRequest(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
