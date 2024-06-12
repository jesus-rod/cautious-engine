import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    try {
      const files = await prisma.fileMetadata.findMany({
        orderBy: {
          uploadDate: 'desc'
        }
      })

      res.status(200).json(files);

    } catch (error) {
      res.status(500).json({message: 'Error retrieving files'});
    }
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}
