'use client';

import { processDocument } from '@/app/functions';
import { useApiRequest } from '@/lib/useApiRequest';
import React, { useState } from 'react';
import ShowModelComponent from './ShowModelComponent';

interface RunModelProps {
  id: string;
}

const RunModelComponent: React.FC<RunModelProps> = ({ id }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [didModelRunSuccessfully, setDidModelRunSuccessfully] = useState(false);
  let buttonMessage = 'Run Topic Modeling';

  const { execute } = useApiRequest<Response>();

  const handleProcessDocument = async () => {
    setIsButtonDisabled(true);
    await execute(
      () => processDocument(id),
      () => {
        setDidModelRunSuccessfully(true);
        buttonMessage = 'Show Analysis';
      },
      (error) => {
        console.error('Error processing document:', error);
      }
    );
    setIsButtonDisabled(false);
  };

  return didModelRunSuccessfully ? (
    <ShowModelComponent id={id} />
  ) : (
    <div className="flex items-center h-full">
      <button
        onClick={handleProcessDocument}
        disabled={isButtonDisabled}
        className="py-3 px-4 bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold rounded disabled:opacity-50"
      >
        {isButtonDisabled ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Running...
          </div>
        ) : (
          'Run Topic Modeling'
        )}
      </button>
    </div>
  );
};

export default RunModelComponent;
