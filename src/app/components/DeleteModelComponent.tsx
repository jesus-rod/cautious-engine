'use client';

import {useApiRequest} from "@/lib/useApiRequest";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {deleteDocument} from "../functions";
import ConfirmationAlert from "./ConfirmationAlert";

interface DeleteModelProps {
  id: string;
}

const DeleteModelComponent: React.FC<DeleteModelProps> = ({id}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();

  const {execute} = useApiRequest<Response>();

  const handleDelete = async () => {
    setIsButtonDisabled(true);
    await execute(
      () => deleteDocument(id),
      () => {
        router.refresh();
      },
      (error) => {
        console.error('Error deleting document', error);
      }
    );
    setIsButtonDisabled(false);
  };

  return (
    <div className="flex items-center h-full">
      <ConfirmationAlert onConfirm={handleDelete}>
        <button
          type="button"
          disabled={isButtonDisabled}
          className="py-3 px-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded cursor-pointer flex items-center justify-center"
        >
          {isButtonDisabled ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </ConfirmationAlert>
    </div>
  );
}

export default DeleteModelComponent;