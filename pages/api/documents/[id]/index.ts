import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {id} = req.query;
  console.log('api DETAIL id:', id);
  if (req.method === 'GET') {
    try {
      const document = await prisma.fileMetadata.findUnique({
        where: {id: String(id)},
      })
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({message: 'Error retrieving files'});
    }
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}
