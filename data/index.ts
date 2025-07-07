export interface DLLDatum {
  baitang: string;
  asignatura: string;
  markahan: string;
  dllLink: string;
}

export const dllData: DLLDatum[] = [
  {
    baitang: "4",
    asignatura: "GMRC",
    markahan: "2",
    dllLink:
      "https://res.cloudinary.com/dw3zuv8pb/raw/upload/v1751871340/DLL-MATATAG-_GMRC-4-Q4-W1_br3aq1.docx",
  },
];


export const dlpData = [
    {
        id: 1,
        paaralan: "",
        pangalanNgGuro: "",
        petsaAtOras: "",
        lessonPlan: [
            {
                id: 1,
                baitang: "",
                asignatura: "",
                markahan: "",
                getLessonPlan: [
                    {
                        id: 1,
                        title: "I. NILALAMAN NG KURIKULUM, PAMANTAYAN, AT MGA KASANAYAN SA ARALIN",
                        content: [
                            {
                                id: 1,
                                title: "A. Mga Pamantayang Pangnilalaman",
                                impormasyon: ""
                            },{
                                id: 2,
                                title: "B. Mga Pamantayan sa Pagganap",
                                impormasyon: ""
                            },{
                                id: 3,
                                title: "C. Mga Kasanayan at Layuning Pampagkatuto",
                                impormasyon: ""
                            },{
                                id: 4,
                                title: "D. Nilalaman",
                                impormasyon: ""
                            },{
                                id: 5,
                                title: "E. Pagpapahalagang Lilinangin",
                                impormasyon: ""
                            },{
                                id: 6,
                                title: "F. Integrasyon",
                                impormasyon: ""
                            },
                        ],
                    },{
                        id: 2,
                        title: "II. BATAYANG SANGGUNIAN SA PAGKATUTO",
                        content: [
                            {
                                id: 1,
                                impormasyon: "",
                            },
                        ],
                    },{
                        id: 3, 
                        title: "III. MGA HAKBANG SA PAGTUTURO AT PAGKATUTO",
                        content: [
                            {
                                id: 1,
                                title: "A. Pagkuha ng Dating Kaalaman",
                                impormasyon: "",
                                mgaTala: "",
                            },{
                                id: 2,
                                title: "B. Paglalahad ng Layunin",
                                impormasyon: "",
                                mgaTala: "",
                            },{
                                id: 3,
                                title: "C. Paglinang at Pagpapalalim",
                                impormasyon: "",
                                mgaTala: "",
                            },{
                                id: 4,
                                title: "D. Paglalahat",
                                impormasyon: "",
                                mgaTala: "",
                            },
                        ]
                    },{
                        id: 4,
                        title: "IV. EBALWAYSON NG PAGKATUTO: PAGTATAYA AT PAGNINILAY",
                        content: [
                           {
                                id: 1,
                                title: "A. Pagtataya",
                                impormasyon: "",
                                mgaTala: "",
                            },{
                                id: 2,
                                title: "B. Pagbuo ng Anotasyon",
                                impormasyon: "",
                                mgaTala: "",
                            },{
                                id: 3,
                                title: "C. Pagninilay",
                                impormasyon: "",
                                mgaTala: "",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];