import ExcelJS from 'exceljs';
import database from './src/Config/database.js'; // Conexão via Knex
import dayjs from 'dayjs';

const NUM_DIAS = 31;

const registros = await database('entregas as en')
    .join('pedidos as p', 'p.id', 'en.id_pedido')
    .join('escolas as e', 'p.escola_id', 'e.id')
    .join('zonas as z', 'e.zona', 'z.id')
    .join('refeicoes as r', 'p.tipo_ref', 'r.id')
    .where('p.entregue', true)
    .select(
        'e.nome as escola',
        'z.nome as zona',
        'r.nome as refeicao',
        'r.preco_unit as precoUnit',
        database.raw('EXTRACT(DAY FROM p.data_entrega)::int as dia'),
        database.raw('(en.creche + en.pre_escola + en.fund + en.func) as total')
    );

// Agrupar os dados por escola + refeição
const agrupado = {};

for (const reg of registros) {
    const key = `${reg.escola}||${reg.zona}||${reg.refeicao}||${reg.precoUnit}`;
    if (!agrupado[key]) {
        agrupado[key] = {
            escola: reg.escola,
            zona: reg.zona,
            refeicao: reg.refeicao,
            precoUnit: parseFloat(reg.precoUnit),
            dias: Array(NUM_DIAS).fill(0),
        };
    }
    agrupado[key].dias[reg.dia - 1] += parseInt(reg.total);
}

// Criar planilha
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Boletim');

const headers = [
    'REFEIÇÃO', 'LOCALIZAÇÃO', 'UND',
    ...Array.from({ length: NUM_DIAS }, (_, i) => `${i + 1}`),
    'QNT TOTAL', 'VLR UNIT', 'VALOR TOTAL'
];

worksheet.addRow(headers);
worksheet.getRow(1).font = { bold: true };
worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

// Largura de colunas
worksheet.columns = headers.map((_, i) => ({
    width: i < 3 ? 20 : 10,
}));

// Adicionar dados
Object.values(agrupado).forEach(entry => {
    const total = entry.dias.reduce((sum, v) => sum + v, 0);
    const valorTotal = total * entry.precoUnit;

    const row = worksheet.addRow([
        `${entry.refeicao} ${entry.zona.toUpperCase()}`,
        entry.escola.toUpperCase(),
        'UND',
        ...entry.dias,
        total,
        `R$ ${entry.precoUnit.toFixed(2).replace('.', ',')}`,
        `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
    ]);

    row.alignment = { vertical: 'middle', horizontal: 'center' };
});

// Estilizar bordas
worksheet.eachRow({ includeEmpty: false }, row => {
    row.eachCell(cell => {
        cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
        };
    });
});

// Salvar
const nomeArquivo = `boletim-entregas-${dayjs().format('YYYY-MM-DD')}.xlsx`;
await workbook.xlsx.writeFile(nomeArquivo);
console.log(`✅ Planilha gerada: ${nomeArquivo}`);
