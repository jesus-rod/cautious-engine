import DocumentsList from "@/app/components/DocumentList";
import {getServerSession} from "next-auth/next";
import {redirect} from "next/navigation";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";

const FileList = async () => {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <main className='flex min-h-screen flex-col justify-between p-"'>
      <div>
        <div>
          <h1 className="text-4xl font-bold p-8"> Uploaded Files </h1>
        </div>
        <DocumentsList />
      </div>
    </main>

  );
};

export default FileList;
