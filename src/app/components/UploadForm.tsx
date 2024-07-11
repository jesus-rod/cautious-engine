'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { uploadAction } from './UploadAction';
import UploadButton from './UploadButton';

const UploadForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, action] = useFormState(uploadAction, {
    message: '',
  });

  let shouldShowRedirectLink = false;
  let message = formState.message;
  if (formState.message === 'File uploaded successfully.') {
    shouldShowRedirectLink = true;
    formRef.current?.reset();
  }

  const handleNavigation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setTimeout(() => {
      router.push('/documents');
      router.refresh();
    }, 0);
  };

  return (
    <form action={action} ref={formRef}>
      <input
        name="file"
        type="file"
        accept=".txt"
        className="border-2 border-stone-300 dark:border-stone-600 py-2 mb-4 mr-4 px-2 rounded bg-white dark:bg-gray-800 text-zinc-900 dark:text-zinc-100"
      />
      <UploadButton />
      {shouldShowRedirectLink && (
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          <button
            onClick={handleNavigation}
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            {message} <b>Click here</b> to see your documents.
          </button>
        </p>
      )}
    </form>
  );
};

export default UploadForm;
