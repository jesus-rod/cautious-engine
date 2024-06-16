'use client';
import {uploadFile} from '@/app/functions';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';

export default function Upload() {
  const router = useRouter();

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/documents');
    router.refresh();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setIsButtonDisabled(true);

    try {
      const response = await uploadFile(file);
      if (response.ok) {
        setMessage('File uploaded successfully.');
      } else {
        setMessage('File upload failed: HTTP' + response.status);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('An unknown error occurred.');
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="border-2 border-stone-300 py-2 mb-4 mr-4 px-2 rounded"
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
        >
          {isButtonDisabled ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </div>
          ) : (
            'Upload'
          )}
        </button>
        {message && (
          <p>
            <button onClick={handleNavigation}>
              {message} <b>Click here</b> to see your documents.
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
