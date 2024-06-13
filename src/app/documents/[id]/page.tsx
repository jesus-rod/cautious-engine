import GraphVisualization from '@/app/components/client/GraphVisualization';
import {notFound} from 'next/navigation';

async function getData(documentId: string) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/documents/${documentId}`, {next: {revalidate: 1}});
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}



export default async function DocumentDetail({params}: {params: {id: string}}) {
  const {id} = params;
  const data = await getData(id);
  const analysisResult = data.analysisResult;
  const parsedAnalysisResult = JSON.parse(analysisResult);
  if (!data) {
    notFound();
  }

  return (
    <main>
      <h1 className="text-4xl font-bold p-8"> Graph Visualization </h1>
      <div className="border-black">
        <GraphVisualization data={parsedAnalysisResult} />
      </div>
    </main>
  );
}
