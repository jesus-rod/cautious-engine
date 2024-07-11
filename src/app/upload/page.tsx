import Upload from './Upload';

export default function UploadPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold"> Topic Modeling </h1>
        <p className="text-center">
          This is a simple web app that allows you to upload a text file and
          perform topic modeling on it.
        </p>
        <div className="mt-24">
          <Upload />
        </div>
      </div>
    </main>
  );
}
