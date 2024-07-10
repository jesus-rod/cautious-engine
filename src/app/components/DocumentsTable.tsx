import {DocumentData} from '@/app/types';
import React from 'react';
import RunModelComponent from './RunModelComponent';
import ShowModelComponent from './ShowModelComponent';

interface DocumentsTableProps {
  data: DocumentData[];
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({data}) => {

  const sizeInKb = (size: number): string => {
    return (size / 1024).toFixed(2) + ' KB';
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800">#</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800">File name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800">File size</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800">Date Uploaded</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((document, index) => (
          <tr key={document.id}>
            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{document.filename}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100"> {sizeInKb(document.filesize)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{new Date(document.uploadDate).toLocaleDateString('de-DE')}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
              {!document.analysisResult && <RunModelComponent id={document.id} />}
              {document.analysisResult &&
                <ShowModelComponent id={document.id} />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default DocumentsTable;
