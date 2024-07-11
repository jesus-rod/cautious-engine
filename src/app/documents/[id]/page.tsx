import GraphVisualization from '@/app/components/GraphVisualization';
import { fetchDocumentDetail } from '@/app/functions';
import { DocumentData } from '@/app/types';
import { notFound } from 'next/navigation';

export default async function DocumentDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data: DocumentData | null = await fetchDocumentDetail(id);

  if (!data) {
    notFound();
  }
  const analysisResult = data.analysisResult;
  const parsedAnalysisResult = JSON.parse(analysisResult);
  const textSummary = parsedAnalysisResult.summary;

  return (
    <main>
      <h1 className="text-4xl font-bold p-8"> Document Analysis </h1>
      {textSummary && (
        <section>
          <h2 className="text-xl font-bold px-8 text-gray-900 dark:text-white">
            Summary
          </h2>
          <p className="p-8 text-gray-900 dark:text-white">{textSummary}</p>
        </section>
      )}
      <section className="border-black">
        <GraphVisualization data={parsedAnalysisResult} />
      </section>
    </main>
  );
}
