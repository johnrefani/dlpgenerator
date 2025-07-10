import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export async function generateFilledDocx(
  cloudUrl: string,
  data: Record<string, string>
): Promise<Blob> {
  const res = await fetch(cloudUrl);
  const content = await res.arrayBuffer();
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    delimiters: { start: '{{', end: '}}' },
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.setData(data);
  
  try {
    doc.render();
  } catch (error) {
    console.error("Error rendering document:", error);
    throw new Error("Failed to render document template");
  }

  const out = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });
  
  return out;
}