import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { parseFile } from '../services/fileParser';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onContentParsed: (content: string, title: string) => void;
}

export function FileUpload({ onContentParsed }: FileUploadProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const file = acceptedFiles[0];
        const content = await parseFile(file);
        onContentParsed(content.text, file.name);
        toast.success('File uploaded successfully!');
      } catch (error) {
        toast.error('Error processing file');
        console.error('Error processing file:', error);
      }
    },
    [onContentParsed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400'
        }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? 'Drop the file here...'
          : 'Drag & drop a file here, or click to select'}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supported formats: TXT, PDF
      </p>
    </div>
  );
}