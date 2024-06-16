import GraphVisualization from '@/app/components/client/GraphVisualization';
import {fetchDocumentDetail} from '@/app/functions';
import {DocumentData} from '@/app/types';
import {notFound} from 'next/navigation';

export default async function DocumentDetail({params}: {params: {id: string}}) {
  const {id} = params;
  const data: DocumentData | null = await fetchDocumentDetail(id);

  if (!data) {
    notFound();
  }
  const analysisResult = data.analysisResult;
  const parsedAnalysisResult = JSON.parse(analysisResult);


  return (
    <main>
      <h1 className="text-4xl font-bold p-8"> Graph Visualization </h1>
      <div className="border-black">
        <GraphVisualization data={parsedAnalysisResult} />
      </div>
    </main>
  );
}
