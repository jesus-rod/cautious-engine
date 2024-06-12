import DocumentsList from '../components/server/DocumentList';

const FileList = () => {
  return (
    <main className='flex min-h-screen flex-col justify-between p-"'>
      <div>
        <h1 className="text-4xl font-bold p-8"> Uploaded Files </h1>
        <DocumentsList />
      </div>
    </main>

  );
};

export default FileList;
