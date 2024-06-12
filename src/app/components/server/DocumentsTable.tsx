import React from 'react';
import RunModelComponent from '../client/RunModelComponent';
import ShowModelComponent from '../client/ShowModelComponent';

interface DocumentData {
  id: string;
  filename: string;
  filesize: number;
  uploadDate: string;
  analysisResult: string;
}

interface DocumentsTableProps {
  data: DocumentData[];
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({data}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filesize</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Uploaded</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((document) => (
          <tr key={document.id}>
            <td className="px-6 py-4 whitespace-nowrap">{document.filename}</td>
            <td className="px-6 py-4 whitespace-nowrap">{document.filesize} bytes</td>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(document.uploadDate).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {!document.analysisResult && <RunModelComponent id={document.id} />}
              {document.analysisResult && <ShowModelComponent id={document.id} />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default DocumentsTable;
