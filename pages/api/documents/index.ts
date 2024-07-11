import { PAGINATION_LIMIT } from '@/lib/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseHandler } from '../DatabaseHandler';

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || PAGINATION_LIMIT;

  try {
    const documentDataResponse = await DatabaseHandler.getFiles(page, limit);
    res.status(200).json({
      data: documentDataResponse.data,
      pagination: documentDataResponse.pagination,
    });
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
