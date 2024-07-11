import { DocumentData, DocumentListResponse, LoginData, RegisterData } from '@/app/types';
import { signIn, SignInResponse } from 'next-auth/react';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

// 📁 Modeling Related Queries
export async function fetchDocumentList(page: number = 1, limit: number = 15): Promise<DocumentListResponse> {
  const fetchUrl = `${baseUrl}/api/documents?page=${page}&limit=${limit}`;
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const documentList: DocumentListResponse = await response.json();
  return documentList;
}

export async function fetchDocumentDetail(documentId: string): Promise<DocumentData | null> {
  const response = await fetch(`${baseUrl}/api/documents/${documentId}`, {
    next: { revalidate: 1 },
  });
  if (!response.ok) {
    return null;
  }

  const data: DocumentData = await response.json();
  return data;
}

export const uploadFile = async (file: File): Promise<Response> => {
  const formData = new FormData();
  formData.append('file', file);

  return await fetch(`${baseUrl}/api/upload`, {
    method: 'POST',
    body: formData,
  });
};

export const processDocument = async (id: string): Promise<Response> => {
  return await fetch(`api/documents/${id}/process`, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteDocument = async (id: string): Promise<Response> => {
  return await fetch(`api/documents/${id}/delete`, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 🔑 Auth Related Queries
export const registerUser = async (data: RegisterData): Promise<Response> => {
  return await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: LoginData): Promise<SignInResponse | undefined> => {
  return await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });
};
