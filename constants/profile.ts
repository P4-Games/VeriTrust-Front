import { DUMMY_TENDERS } from "./tender";

export type QuoteState = {
    txid: string,
    name: string,
    type: "Licitacion Pública" | "Licitacion Privada",
    status: "Pendiente" | "Pendiente de reveal" | "Pendiente de elegir ganador" | "Adjudicado" | "Perdida";
    stage: 1 | 2 | 3 | 4;
    stageText: [string, string][]; // Date, URL TX
}

export const MY_QUOTES: QuoteState[] = [
    {
        txid: DUMMY_TENDERS[0].txid,
        name: DUMMY_TENDERS[0].name,
        type: DUMMY_TENDERS[0].type,
        status: "Pendiente",
        stage: 2,
        stageText: [
            ["27/07/2023 15:33", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["01/08/2023 19:00", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["15/08/2023 00:00", ""]
        ]
    },
    {
        txid: DUMMY_TENDERS[1].txid,
        name: DUMMY_TENDERS[1].name,
        type: DUMMY_TENDERS[1].type,
        status: "Pendiente de reveal",
        stage: 2,
        stageText: [
            ["27/07/2023 15:33", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["01/08/2023 19:00", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["15/08/2023 00:00", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
        ],
    },
    {
        txid: DUMMY_TENDERS[2].txid,
        name: DUMMY_TENDERS[2].name,
        type: DUMMY_TENDERS[2].type,
        status: "Pendiente de elegir ganador",
        stage: 3,
        stageText: [
            ["27/07/2023 15:33", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["01/08/2023 19:00", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["15/08/2023 00:00", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
        ],
    },
    {
        txid: DUMMY_TENDERS[3].txid,
        name: DUMMY_TENDERS[3].name,
        type: DUMMY_TENDERS[3].type,
        status: "Adjudicado",
        stage: 4,
        stageText: [
            ["27/07/2023 15:33", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["01/08/2023 19:00", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
            ["15/08/2023 00:00", "https://etherscan.io/tx/0x886caa0aa12956016d7c63e3f7b8964b1692d04e53020cb3648556a71d603ca4"],
        ],
    }
]

export type TendersState = {
    txid: string,
    name: string,

}

export const MY_TENDERS = [];
