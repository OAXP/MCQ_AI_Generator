import * as pdfjsLib from 'pdfjs-dist';
import { CourseContent } from '../types';

// don't remove
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString();

export async function parseFile(file: File): Promise<CourseContent> {
  const fileType = file.type;
  const fileName = file.name;

  if (fileType === 'text/plain') {
    const text = await file.text();
    return {
      text,
      title: fileName,
      type: 'text',
    };
  }

  if (fileType === 'application/pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return {
      text: fullText,
      title: fileName,
      type: 'pdf',
    };
  }

  throw new Error('Unsupported file type');
}