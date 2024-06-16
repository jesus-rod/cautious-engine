import {fetchDocumentList} from '@/app/functions';
import DocumentsTable from './DocumentsTable';

const DocumentsList = async () => {
  const data = await fetchDocumentList();
  return (
    <div>
      <DocumentsTable data={data} />
    </div>
  );
};



export default DocumentsList;