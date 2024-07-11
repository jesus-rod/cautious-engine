import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseHandler } from '../DatabaseHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await DatabaseHandler.createUser(
        name,
        email,
        hashedPassword
      );
      res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({
        message: 'Error creating user',
        error: (error as Error).message,
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
