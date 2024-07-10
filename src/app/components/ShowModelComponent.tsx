'use client';

import Link from "next/link";

interface ShowModelProps {
  id: string;
}

const ShowModelComponent: React.FC<ShowModelProps> = ({id}) => {

  return (
    <div className="my-3">
      <Link href={`/documents/${id}`} className="py-3 px-4 bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold rounded disabled:opacity-50">
        Show Document
      </Link >
    </div>
  );
}
export default ShowModelComponent;
