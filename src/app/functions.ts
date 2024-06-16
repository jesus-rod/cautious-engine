import {DocumentData} from "./types";

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';


export async function fetchDocumentList(): Promise<DocumentData[]> {
  const response = await fetch(`${baseUrl}/api/documents`, {next: {revalidate: 1}});
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const data: DocumentData[] = await response.json();
  return data
}

export async function fetchDocumentDetail(documentId: string): Promise<DocumentData | null> {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/documents/${documentId}`, {next: {revalidate: 1}});
  if (!response.ok) {
    return null;
  }

  const data: DocumentData = await response.json();
  return data;
}

export const uploadFile = async (file: File): Promise<Response> => {
  const formData = new FormData();
  formData.append('file', file);

  return await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
}

export const processDocument = async (id: string): Promise<Response> => {
  return await fetch(`api/documents/${id}/process`, {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}