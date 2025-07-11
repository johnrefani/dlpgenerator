import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export async function generateFilledDocx(
  cloudUrl: string,
  data: Record<string, string>
): Promise<Blob> {
  try {
    const res = await fetch(cloudUrl);
    if (!res.ok) throw new Error(`Failed to fetch template: ${res.statusText}`);
    
    const content = await res.arrayBuffer();
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      delimiters: { start: '{{', end: '}}' },
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(data);
    doc.render();

    return doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      compression: 'DEFLATE'
    });
  } catch (error) {
    console.error("Error processing document:", error);
    throw new Error("Failed to process document template");
  }
}