
'use client';

import Link from "next/link";

interface ShowModelProps {
  id: string;
}

const ShowModelComponent: React.FC<ShowModelProps> = ({id}) => {

  return (
    <Link href={`/documents/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
      Show Document
    </Link>
  );
}
export default ShowModelComponent;
