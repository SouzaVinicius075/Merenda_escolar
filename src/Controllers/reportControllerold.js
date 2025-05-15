import excel from 'exceljs'
import database from '../Config/database.js'
import reportModel from '../models/reportModel.js'

const createFormExcel = async () => {
    const workbook = new excel.Workbook()
    const sheet = workbook.addWorksheet('BM FATURAMENTO MENSAL')

    sheet.mergeCells('A1:K2')
    const titulo = sheet.getCell('A1')
    titulo.value = 'BOLETIM POR MODALIDADE ESCOLAR'
    titulo.alignment = {
        vertical: 'middle',
        horizontal: 'center'
    }
    sheet.mergeCells('A3:A4')
    sheet.getCell('A3').value = 'REFEIÇÃO'

    sheet.mergeCells('B3:B4')
    sheet.getCell('B3').value = 'UND'

    sheet.mergeCells('C3:C4')
    sheet.getCell('C3').value = 'PRECO UNIT'

    sheet.mergeCells('D3:E3')
    sheet.getCell('D3').value = 'CRECHE'
    sheet.getCell('D4').value = 'QNT'
    sheet.getCell('E4').value = 'VALOR TOTAL'

    sheet.mergeCells('F3:G3')
    sheet.getCell('F3').value = 'PRE ESCOLA'
    sheet.getCell('F4').value = 'QNT'
    sheet.getCell('G4').value = 'VALOR TOTAL'

    sheet.mergeCells('H3:I3')
    sheet.getCell('H3').value = 'FUNDAMENTAL'
    sheet.getCell('H4').value = 'QNT'
    sheet.getCell('I4').value = 'VALOR TOTAL'

    sheet.mergeCells('J3:J4')
    sheet.getCell('J3').value = 'TOTAL'

    sheet.mergeCells('K3:K4')
    sheet.getCell('K3').value = 'VALOR TOTAL'

    const estilo = {
        font: { bold: true, color: { argb: 'FFFFFFFF' } },
        alignment: { horizontal: 'center', vertical: 'middle' },
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1E2A38' }
        }
    };

    ['A1', 'A3', 'B3', 'C3', 'D3', 'D4', 'E4', 'F3', 'F4', 'G4', 'H3', 'H4', 'I4', 'J3', 'K3'].forEach(cellRef => {
        const cell = sheet.getCell(cellRef);
        cell.font = estilo.font;
        cell.alignment = estilo.alignment;
        cell.fill = estilo.fill;
    });

    const getTypeFood = await database('refeicoes')
    const dadosBM = await reportModel.getTotalOrders()
    for (let i = 0; i < 5; i++) {
        sheet.getCell(`A${i + 5}`).value = dadosBM[i].nome
        sheet.getCell(`B${i + 5}`).value = 'UND'
        sheet.getCell(`C${i + 5}`).value = Number(dadosBM[i].preco_unit)

        sheet.getCell(`D${i + 5}`).value = Number(dadosBM[i].totalpedido)
        sheet.getCell(`E${i + 5}`).value = Number(dadosBM[i].totalcreche)
        sheet.getCell(`F${i + 5}`).value = Number(dadosBM[i].totalppre)
        sheet.getCell(`G${i + 5}`).value = Number(dadosBM[i].vlrtotalpre)
        sheet.getCell(`H${i + 5}`).value = Number(dadosBM[i].totalfund)
        sheet.getCell(`I${i + 5}`).value = Number(dadosBM[i].vlrtotalfund)
        sheet.getCell(`J${i + 5}`).value = `=SOMA(F${i + 5};D${i + 5};H${i + 5})`
        sheet.getCell(`K${i + 5}`).value = Number(dadosBM[i].vlrtotal)
    }

    const sheet2 = workbook.addWorksheet('DETALHAMENTO')
    await workbook.xlsx.writeFile('ArquivoExcel.xlsx')


}
export default { createFormExcel }