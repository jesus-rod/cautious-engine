'use client';

import React, {useState} from 'react';

interface RunModelProps {
  id: string;
}

const RunModelComponent: React.FC<RunModelProps> = ({id}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const runTopicModeling = async () => {
    setIsButtonDisabled(true);
    console.log(`Running topic modeling for document with id: ${id}`);

    try {
      const response = await fetch(`api/documents/${id}/process`, {
        method: 'POST',
        body: JSON.stringify({id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Modeling completed successfully');
      } else {
        // Handle error response
        console.error('Error running topic modeling :(');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error running topic modeling:', error);
    }

    setIsButtonDisabled(false);
  };

  return (
    <button
      onClick={runTopicModeling}
      disabled={isButtonDisabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isButtonDisabled ? 'Running...' : 'Run Topic Modeling'}
    </button>
  );
};

export default RunModelComponent;