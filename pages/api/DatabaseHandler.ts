import { User } from '@/app/types';
import { PrismaClient } from '@prisma/client';

// Use the Singleton pattern to avoid multiple DB instances
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export class DatabaseHandler {
  static getPrismaClient() {
    return prisma;
  }

  static async createUser(name: string, email: string, password: string): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

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

  static async getFiles(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const paginatedData = await prisma.fileMetadata.findMany({
      orderBy: {
        uploadDate: 'desc',
      },
      skip: skip,
      take: limit,
    });

    const fileCount = await prisma.fileMetadata.count();

    return {
      data: paginatedData,
      pagination: {
        limit: limit,
        total: fileCount,
        totalPages: Math.ceil(fileCount / limit),
        currentPage: page,
      },
    };
  }

  static async getFileById(id: string) {
    return await prisma.fileMetadata.findUnique({
      where: { id: id },
    });
  }

  static async deleteFileById(id: string) {
    return await prisma.fileMetadata.delete({
      where: { id: id },
    });
  }

  static async updateFileAnalysisResult(id: string, analysisResult: string) {
    return await prisma.fileMetadata.update({
      where: { id: id },
      data: {
        analysisResult: analysisResult,
      },
    });
  }

  static async getTopics() {
    return await prisma.topic.findMany();
  }
}
