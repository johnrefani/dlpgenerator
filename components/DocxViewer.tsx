import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { DocxViewerProps } from '@/lib/props';

const DocxViewer: React.FC<DocxViewerProps> = ({
  pangalanNgGuro,
  petsaAtOras,
  baitang,
  asignatura,
  markahan,
  docxUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(docxUrl);
      if (!response.ok) throw new Error('Failed to fetch DOCX file');
      const arrayBuffer = await response.arrayBuffer();

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Pangalan ng Guro: ${pangalanNgGuro}`,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Petsa at Oras ng Pagtuturo: ${petsaAtOras}`,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun(
                    'Content from the original document will be appended here.',
                  ),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Modified_${baitang}_${asignatura}_${markahan}.docx`);
    } catch (err) {
      setError('Error processing the DOCX file. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          {baitang} - {asignatura} - {markahan}
        </h2>
        <p>Pangalan ng Guro: {pangalanNgGuro}</p>
        <p>Petsa at Oras: {petsaAtOras}</p>
      </div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Processing...' : 'Download Modified DOCX'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default DocxViewer;