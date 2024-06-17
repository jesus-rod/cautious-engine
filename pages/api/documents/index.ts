import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseHandler } from '../DatabaseHandler';

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const files = await DatabaseHandler.getFiles();
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving files' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    await handleGetRequest(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
