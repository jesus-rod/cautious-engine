import {File, Options} from 'formidable';
import {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {DatabaseHandler} from './DatabaseHandler';
import {FileHandler} from './FileHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

const sanitizeFilename = (filename: string) => {
  return filename.replace(/[^a-z0-9.\-_]/gi, '_').toLowerCase();
};

const handleFileUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  const options: Options = {
    multiples: false,
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024, // 2MB
    allowEmptyFiles: false,
    filter: ({originalFilename, mimetype}) => {
      const allowedExtensions = ['.txt'];
      const fileExtension = path.extname(originalFilename || '').toLowerCase();
      const isAllowedExtension = allowedExtensions.includes(fileExtension);
      const allowedMimeTypes = ['text/plain'];
      const isAllowedMimeType = allowedMimeTypes.includes(mimetype || '');
      return isAllowedExtension && isAllowedMimeType;
    },
  };

  try {
    const {files} = await FileHandler.parseForm(req, options);
    const file = files.file as File[];
    const firstFile = file[0];

    if (!firstFile.originalFilename) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    const sanitizedFilename = sanitizeFilename(firstFile.originalFilename);
    const newFilename = await FileHandler.saveFile({...firstFile, originalFilename: sanitizedFilename});
    await DatabaseHandler.saveFileMetadata(newFilename, firstFile.size);

    res.status(200).json({message: 'File uploaded successfully', filename: newFilename});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'File upload or metadata saving failed'});
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handleFileUpload(req, res);
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}
