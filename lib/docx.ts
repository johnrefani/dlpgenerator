import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function generateFilledDocx(
  cloudUrl: string,
  data: Record<string, string>
): Promise<Blob> {
  try {
    const res = await fetch(cloudUrl, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch document: ${res.statusText}`);
    }
    const content = await res.arrayBuffer();
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      delimiters: { start: "{{", end: "}}" },
      paragraphLoop: true,
      linebreaks: true,
      nullGetter: () => "",
    });

    doc.setData(data);
    try {
      doc.render();
    } catch (err) {
      throw new Error(`Document rendering failed: ${err}`);
    }

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE",
    });
    return out;
  } catch (err) {
    throw new Error(`Failed to generate document: ${err}`);
  }
}