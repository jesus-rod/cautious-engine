import {NextApiRequest, NextApiResponse} from 'next';
import {DatabaseHandler} from '../../DatabaseHandler';
import {FileHandler} from '../../FileHandler';
import {LLMService} from '../../LLMService';


const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const {id} = req.query;

  try {
    const file = await DatabaseHandler.getFileById(String(id));
    const topics = (await DatabaseHandler.getTopics()).map((topic) => topic.name);
    console.log('Topics:', topics)

    if (!file) {
      res.status(404).json({message: 'File not found'});
      return;
    }

    const fileName = file.filename;
    const filePath = FileHandler.getFilePath(fileName);
    const fileContents = FileHandler.readFileContents(filePath);

    // Use the file content as input for the LLM algorithm
    const processedData = await LLMService.runAlgorithm(fileContents, topics);
    if (!processedData) {
      res.status(500).json({message: 'Failed to process the file content'});
      return;
    }

    // Update the document with the processed text
    const updatedFile = await DatabaseHandler.updateFileAnalysisResult(String(id), JSON.stringify(processedData));

    res.status(200).json(updatedFile);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({message: 'Error processing file'});
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    await handlePostRequest(req, res);
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}
