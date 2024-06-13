
'use client';
import {useState} from 'react';

export default function Upload() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;
    setIsButtonDisabled(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully');
      } else {
        setMessage('File upload failed (frontend error)');
      }
    } catch (error: any) {
      setMessage('Error: ' + error.message);
    } finally {
      setIsButtonDisabled(false);
    }

  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt" onChange={handleFileChange} className="mb-4 mr-4" style={{border: '1px solid #ccc', padding: '8px', borderRadius: '4px'}} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isButtonDisabled ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            'Upload'
          )}
        </button>
        {message && <p>{message}</p>}



      </form>
    </div>
  );
}