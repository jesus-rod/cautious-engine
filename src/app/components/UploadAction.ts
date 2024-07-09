'use server'
import {uploadFile} from '@/app/functions'

export async function uploadAction(file: File | null, formData: FormData) {
  console.log("server action called")
  if (!file) {
    return {error: 'No file selected'}
  }

  try {
    const response = await uploadFile(file)
    if (response.ok) {
      return {message: 'File uploaded successfully.'}
    } else {
      return {error: `File upload failed: HTTP ${response.status}`}
    }
  } catch (error) {
    return {error: error instanceof Error ? error.message : 'An unknown error occurred.'}
  }
}