import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrigir __dirname no contexto ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do HTML
const templatePath = path.join(__dirname, 'HTMLReport.html');
let html = await readFile(templatePath, 'utf-8');
console.log(html);


// Dados para substituir no HTML
const data = {
    MES_ANO: 'Janeiro-2025',
    RESUMO_TIPOS: `
    <tr><td>DESJEJUM</td><td>10</td><td>R$20</td><td>15</td><td>R$30</td><td>16</td><td>R$32</td></tr>
    <tr><td>LANCHE1</td><td>20</td><td>R$40</td><td>30</td><td>R$60</td><td>50</td><td>R$100</td></tr>
  `,
    PEDIDOS_ESCOLAS: `
    <h3>CEECR</h3>
    <table class="table subtable">
      <thead>
        <tr>
          <th>DATA</th>
          <th>TIPO</th>
          <th>CRECHE</th>
          <th>PRE_ESCOLA</th>
          <th>FUND</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>19-05-2025</td><td>DESJEJUM</td><td>10</td><td>15</td><td>16</td></tr>
        <tr><td>19-05-2025</td><td>LANCHE1</td><td>20</td><td>30</td><td>50</td></tr>
      </tbody>
    </table>
  `
};

// Substituição dos placeholders
for (const [key, value] of Object.entries(data)) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
}

// Geração do PDF
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setContent(html, { waitUntil: 'networkidle0' });

await page.pdf({
    path: 'RelatorioMerendaEscolar.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
        top: '20mm',
        bottom: '20mm',
        left: '10mm',
        right: '10mm'
    }
});

await browser.close();
console.log('✅ PDF gerado com sucesso!');
