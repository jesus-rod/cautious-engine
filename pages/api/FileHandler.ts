import formidable, { Fields, File, Files, Options } from 'formidable';
import fs from 'fs';
import { NextApiRequest } from 'next';
import path from 'path';

const generateUniqueFilename = (
  uploadDir: string,
  originalFilename: string | null
) => {
  const fileExtension = path.extname(originalFilename || '');
  const fileNameWithoutExt = path.basename(
    originalFilename || '',
    fileExtension
  );
  let newFilename = originalFilename || '';
  let counter = 1;

  while (fs.existsSync(path.join(uploadDir, newFilename))) {
    newFilename = `${fileNameWithoutExt}-${counter}${fileExtension}`;
    counter++;
  }

  return newFilename;
};

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

export class FileHandler {
  static readFileContents(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  static getFilePath(
    fileName: string,
    uploadDir: string | undefined = UPLOAD_DIR
  ): string {
    return path.join(UPLOAD_DIR, fileName);
  }

  static async saveFile(
    file: File,
    uploadDir: string | undefined = UPLOAD_DIR
  ): Promise<string> {
    const newFilename = generateUniqueFilename(
      uploadDir,
      file.originalFilename || ''
    );
    const oldPath = file.filepath;
    const newPath = path.join(uploadDir, newFilename);

    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(newFilename);
      });
    });
  }

  static parseForm(
    req: NextApiRequest,
    options: Options
  ): Promise<{ fields: Fields; files: Files }> {
    const form = formidable(options);
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    });
  }

  static deleteFile(
    fileName: string,
    uploadDir: string | undefined = UPLOAD_DIR
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(uploadDir, fileName), (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}
