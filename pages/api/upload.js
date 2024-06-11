import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'uploads'); // Ensure this directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const generateUniqueFilename = (uploadDir, originalFilename) => {
  const fileExtension = path.extname(originalFilename);
  const fileNameWithoutExt = path.basename(originalFilename, fileExtension);
  let newFilename = originalFilename;
  let counter = 1;

  while (fs.existsSync(path.join(uploadDir, newFilename))) {
    newFilename = `${fileNameWithoutExt}-${counter}${fileExtension}`;
    counter++;
  }

  return newFilename;
};

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    const options = {
      multiples: false,
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10 MB
      allowEmptyFiles: false,
      filter: ({ originalFilename, mimetype }) => {
        const allowedExtensions = ['.txt'];
        const fileExtension = path.extname(originalFilename).toLowerCase();
        const isAllowedExtension = allowedExtensions.includes(fileExtension);
        const allowedMimeTypes = ['text/plain'];
        const isAllowedMimeType = allowedMimeTypes.includes(mimetype);
        return isAllowedExtension && isAllowedMimeType;
      },
    };
    const form =  formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) {
        // This could be sent for example to a logging service
        console.error(err); // eslint-disable-line no-console
        return res.status(500).json({ message: 'File upload failed 1' });
      }

      const file = files.file[0];
      const newFilename = generateUniqueFilename(uploadDir, file.originalFilename);
      const oldPath = file.filepath;
      const newPath = path.join(uploadDir, newFilename);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
          return res.status(500).json({ message: 'File upload failed 2' });
        }

        res.status(200).json({ message: 'File uploaded successfully' });
      });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
