import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reportPath = path.join(__dirname, '../coverage/lcov-report/index.html');
const outputPath = path.join(__dirname, '../coverage/coverage-report.pdf');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle0' });
    
    await page.pdf({ 
      path: outputPath,
      format: 'A4',
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
      printBackground: true
    });
    
    await browser.close();
    console.log(`✓ Reporte PDF generado en: ${outputPath}`);
  } catch (error) {
    console.error('Error generando PDF:', error);
    process.exit(1);
  }
})();
