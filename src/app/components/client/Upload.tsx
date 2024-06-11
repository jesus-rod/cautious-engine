
'use client';
import {useState} from 'react';

export default function Upload() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log(response);

      if (response.ok) {
        setMessage('File uploaded successfully');
      } else {
        setMessage('File upload failed (frontend error)');
      }
    } catch (error: any) {
      setMessage('Error: ' + error.message);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt" onChange={handleFileChange} className="mb-4 mr-4" style={{border: '1px solid #ccc', padding: '8px', borderRadius: '4px'}} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
        {message && <p>{message}</p>}

      </form>
    </div>
  );
}