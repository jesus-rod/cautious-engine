'use client';

import Link from "next/link";

interface ShowModelProps {
  id: string;
}

const ShowModelComponent: React.FC<ShowModelProps> = ({id}) => {

  return (
    <div className="my-2">
      <Link href={`/documents/${id}`} className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-3 px-4 rounded disabled:opacity-50">
        Show Document
      </Link >
    </div>
  );
}
export default ShowModelComponent;
