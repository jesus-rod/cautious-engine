import {PrismaClient} from '@prisma/client';
import formidable, {Fields, File, Files, Options} from 'formidable';
import fs from 'fs';
import {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
const prisma = new PrismaClient();


export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'uploads'); // Ensure this directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const generateUniqueFilename = (uploadDir: string, originalFilename: string | null) => {
  const fileExtension = path.extname(originalFilename || '');
  const fileNameWithoutExt = path.basename(originalFilename || '', fileExtension);
  let newFilename = originalFilename || '';
  let counter = 1;

  while (fs.existsSync(path.join(uploadDir, newFilename))) {
    newFilename = `${fileNameWithoutExt}-${counter}${fileExtension}`;
    counter++;
  }

  return newFilename;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const options: Options = {
      multiples: false,
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024, // 2 MB ~ 2,097,152 bytes
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
    const form = formidable(options);

    form.parse(req, (err, fields: Fields, files: Files) => {
      if (err) {
        // This could be sent for example to a logging service
        console.error(err); // eslint-disable-line no-console
        return res.status(500).json({message: 'File upload failed 1'});
      }

      const file = files.file as File[];
      const firstFile = file[0];
      const newFilename = generateUniqueFilename(uploadDir, firstFile.originalFilename || '');
      const oldPath = firstFile.filepath;
      const newPath = path.join(uploadDir, newFilename);

      fs.rename(oldPath, newPath, async (err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
          return res.status(500).json({message: 'File upload failed 2'});
        }

        try {
          await prisma.fileMetadata.create({
            data: {
              filename: newFilename,
              filesize: file[0].size,
              uploadDate: new Date(),
              analysisResult: ''
            },
          });

          res.status(200).json({message: 'File uploaded successfully', filename: newFilename});
        } catch (dbErr) {
          console.error(dbErr); // eslint-disable-line no-console
          res.status(500).json({message: 'File metadata saving failed'});
        }
      });
    });
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}
