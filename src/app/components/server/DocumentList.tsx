import DocumentsTable from './DocumentsTable';

export const dynamic = 'force-dynamic'

const DocumentsList = async () => {
  const data = await getData();
  return (
    <div>
      <DocumentsTable data={data} />
    </div>
  );
};

async function getData() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/documents`, {next: {revalidate: 1}});
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await response.json();
  return data
}

export default DocumentsList;