'use server';
import { uploadFile } from '@/app/functions';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
};

export async function uploadAction(formState: FormState, formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    return { message: 'No file selected' };
  }

  try {
    const response = await uploadFile(file);
    if (response.ok) {
      revalidatePath('/documents');
      return { message: 'File uploaded successfully.' };
    } else {
      return { message: `File upload failed: HTTP ${response.status}` };
    }
  } catch (error) {
    return { message: 'An unknown error occurred.' };
  }
}
