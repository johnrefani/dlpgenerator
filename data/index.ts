export interface DLLDatum {
  code: string;
  baitang: string;
  asignatura: string;
  markahan: string;
  dllLink: string;
}

export const dllData: DLLDatum[] = [
  {
    code: "Q4-W1",
    baitang: "4",
    asignatura: "GMRC",
    markahan: "2",
    dllLink:
      "https://res.cloudinary.com/dw3zuv8pb/raw/upload/v1751888360/DLL_MATATAG__GMRC_4_Q1_W1_k1bi3c.docx",
  },
];

  // Options for the markahan combobox
export const markahanOptions = [
    { value: 'Q1_W1', label: 'Quarter 1 - Week 1' },
    { value: 'Q1_W2', label: 'Quarter 1 - Week 2' },
    { value: 'Q1_W3', label: 'Quarter 1 - Week 3' },
    { value: 'Q1_W4', label: 'Quarter 1 - Week 4' },
    { value: 'Q1_W5', label: 'Quarter 1 - Week 5' },
    { value: 'Q1_W6', label: 'Quarter 1 - Week 6' },
    { value: 'Q2_W1', label: 'Quarter 2 - Week 1' },
    { value: 'Q2_W2', label: 'Quarter 2 - Week 2' },
    { value: 'Q2_W3', label: 'Quarter 2 - Week 3' },
    { value: 'Q2_W4', label: 'Quarter 2 - Week 4' },
    { value: 'Q2_W5', label: 'Quarter 2 - Week 5' },
    { value: 'Q2_W6', label: 'Quarter 2 - Week 6' },
    { value: 'Q3_W1', label: 'Quarter 3 - Week 1' },
    { value: 'Q3_W2', label: 'Quarter 3 - Week 2' },
    { value: 'Q3_W3', label: 'Quarter 3 - Week 3' },
    { value: 'Q3_W4', label: 'Quarter 3 - Week 4' },
    { value: 'Q3_W5', label: 'Quarter 3 - Week 5' },
    { value: 'Q3_W6', label: 'Quarter 3 - Week 6' },
    { value: 'Q4_W1', label: 'Quarter 4 - Week 1' },
    { value: 'Q4_W1_1', label: 'Quarter 4 - Week 1.1' },
    { value: 'Q4_W2', label: 'Quarter 4 - Week 2' },
    { value: 'Q4_W2_1', label: 'Quarter 4 - Week 2.1' },
    { value: 'Q4_W3', label: 'Quarter 4 - Week 3' },
    { value: 'Q4_W3_1', label: 'Quarter 4 - Week 3.1' },
    { value: 'Q4_W4', label: 'Quarter 4 - Week 4' },
    { value: 'Q4_W5', label: 'Quarter 4 - Week 5' },
    { value: 'Q4_W6', label: 'Quarter 4 - Week 6' },
  ];