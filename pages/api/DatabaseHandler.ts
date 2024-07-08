import {PrismaClient} from '@prisma/client';


// Use the Singleton pattern to avoid multiple DB instances
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

export class DatabaseHandler {
  static async saveFileMetadata(filename: string, filesize: number): Promise<void> {
    await prisma.fileMetadata.create({
      data: {
        filename,
        filesize,
        uploadDate: new Date(),
        analysisResult: '',
      },
    });
  }

  static async getFiles() {
    return await prisma.fileMetadata.findMany({
      orderBy: {
        uploadDate: 'desc',
      },
    });
  }

  static async getFileById(id: string) {
    return await prisma.fileMetadata.findUnique({
      where: {id: id},
    });
  }

  static async updateFileAnalysisResult(id: string, analysisResult: string) {
    return await prisma.fileMetadata.update({
      where: {id: id},
      data: {
        analysisResult: analysisResult,
      },
    });
  }

  static async getTopics() {
    return await prisma.topic.findMany();
  }
}
