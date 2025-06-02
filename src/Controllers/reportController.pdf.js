import PdfPrinter from 'pdfmake';
import fs from '../../node_modules/pdfmake/fonts'

// Definição das fontes (obrigatório no pdfmake no Node)
const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
    }
};

const printer = new PdfPrinter(fonts);

// Dados simulados
const dadosTelaA = [
    { keyA: 10, keyB: 20, keyC: 30, keyD: 40 },
    { keyA: 15, keyB: 25, keyC: 35, keyD: 45 }
];

const dadosTelaB = [
    { keyA: 11, keyB: 40, keyC: 44, keyD: 12 },
    { keyA: 13, keyB: 41, keyC: 50, keyD: 18 }
];

// Função que gera uma tabela no formato pdfmake
const gerarTabela = (dados) => {
    const header = ['KeyA', 'KeyB', 'KeyC', 'KeyD'];
    const body = [header];

    dados.forEach(item => {
        body.push([item.keyA, item.keyB, item.keyC, item.keyD]);
    });

    return {
        table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            body
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20]
    };
};

// Documento PDF
const docDefinition = {
    content: [
        { text: 'TELA A', style: 'titulo' },
        gerarTabela(dadosTelaA),

        { text: 'TELA B', style: 'titulo' },
        gerarTabela(dadosTelaB)
    ],
    styles: {
        titulo: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
        }
    }
};

// Cria e salva o PDF
const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('relatorio_telas.pdf'));
pdfDoc.end();
