import excel from 'exceljs';
import reportModel from '../models/reportModel.js';

const createFormExcel = async () => {
  const workbook = new excel.Workbook();
  const sheet = workbook.addWorksheet('BM FATURAMENTO MENSAL');

  sheet.mergeCells('A1:K2');
  sheet.getCell('A1').value = 'BOLETIM POR MODALIDADE ESCOLAR';
  sheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  sheet.addRow([
    'REFEIÇÃO', 'UND', 'PRECO UNIT',
    'CRECHE', '', 'PRE ESCOLA', '', 'FUNDAMENTAL', '', 'TOTAL', 'VALOR TOTAL'
  ]);
  sheet.addRow([
    '', '', '',
    'QNT', 'VALOR TOTAL',
    'QNT', 'VALOR TOTAL',
    'QNT', 'VALOR TOTAL',
    '', ''
  ]);

  sheet.mergeCells('A3:A4');
  sheet.mergeCells('B3:B4');
  sheet.mergeCells('C3:C4');
  sheet.mergeCells('D3:E3');
  sheet.mergeCells('F3:G3');
  sheet.mergeCells('H3:I3');
  sheet.mergeCells('J3:J4');
  sheet.mergeCells('K3:K4');

  const estiloCabecalho = {
    font: { bold: true, color: { argb: 'FFFFFFFF' } },
    alignment: { horizontal: 'center', vertical: 'middle' },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E2A38' }
    }
  };

  // Aplicar estilo nas duas primeiras linhas de cabeçalho
  [3, 4].forEach(rowNumber => {
    const row = sheet.getRow(rowNumber);
    row.eachCell(cell => {
      cell.font = estiloCabecalho.font;
      cell.alignment = estiloCabecalho.alignment;
      cell.fill = estiloCabecalho.fill;
    });
  });

  // Definição das colunas para acesso por chave (a partir da linha 5)
  sheet.columns = [
    { header: 'REFEIÇÃO', key: 'refeicao' },
    { header: 'UND', key: 'und' },
    { header: 'PREÇO UNIT', key: 'preco_unit' },
    { header: 'QNT CRECHE', key: 'qnt_creche' },
    { header: 'VALOR CRECHE', key: 'vlr_creche' },
    { header: 'QNT PRÉ', key: 'qnt_pre' },
    { header: 'VALOR PRÉ', key: 'vlr_pre' },
    { header: 'QNT FUND', key: 'qnt_fund' },
    { header: 'VALOR FUND', key: 'vlr_fund' },
    { header: 'TOTAL', key: 'total_formula' },
    { header: 'VALOR TOTAL', key: 'vlr_total' }
  ];

  const dadosBM = await reportModel.getTotalOrders();

  dadosBM.forEach(item => {
    const row = sheet.addRow({
      refeicao: item.nome,
      und: 'UND',
      preco_unit: Number(item.preco_unit),
      qnt_creche: Number(item.totalpedido),
      vlr_creche: Number(item.totalcreche),
      qnt_pre: Number(item.totalppre),
      vlr_pre: Number(item.vlrtotalpre),
      qnt_fund: Number(item.totalfund),
      vlr_fund: Number(item.vlrtotalfund),
      total_formula: null, // fórmula abaixo
      vlr_total: Number(item.vlrtotal)
    });

    const rowNum = row.number;
    row.getCell('total_formula').value = {
      formula: `SOMA(D${rowNum},F${rowNum},H${rowNum})`
    };
  });

  // Formatar colunas monetárias
  ['C', 'E', 'G', 'I', 'K'].forEach(col => {
    sheet.getColumn(col).eachCell((cell, rowNumber) => {
      if (rowNumber > 4) {
        cell.numFmt = '"R$"#,##0.00;[Red]-"R$"#,##0.00';
      }
    });
  });

  // Criar segunda aba (vazia)
  const sheet2 = workbook.addWorksheet('DETALHAMENTO');

  sheet


  // Salvar arquivo
  await workbook.xlsx.writeFile('ArquivoExcel.xlsx');
  console.log('ArquivoExcel.xlsx criado com sucesso!');
};

export default { createFormExcel };
