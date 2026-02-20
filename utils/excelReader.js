const xlsx = require('xlsx');
const path = require('path');

function readExcelData(sheetName = 'Sheet1') {
  const filePath = path.join(process.cwd(), 'test-data', 'nodalofficer-data.xlsx');
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`);
  }

  return xlsx.utils.sheet_to_json(sheet);
}

module.exports = { readExcelData };