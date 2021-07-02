import creds from "app/config/cloud-mobile-app-318506-de8cb0e43819.json";
import { v4 as uuidv4 } from "uuid";
const { GoogleSpreadsheet } = require("google-spreadsheet");

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet(
  "181qB9a0a7MKna-CTYrYZNRjYsUOmpWu5ExKgYLcoHWE"
);

const getSpreadsheetData = async () => {
  const datas = [];
  await doc.useServiceAccountAuth(creds);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells("A1:F1000");
  const rows = await sheet.getRows();
  for (let i = 0; i < rows.length; i++) {
    const serials = [];
    if (rows[i].SERIALS !== undefined) {
      const sls = rows[i].SERIALS;
      var splits = sls.split("|");
      for (let y = 0; y < splits.length; y++) {
        serials.push(splits[y].trim());
      }
    }
    datas.push({
      id: uuidv4(),
      date: rows[i].DATE,
      reference: rows[i].REFERENCE,
      category: rows[i].CATEGORY,
      description: rows[i].DESCRIPTION,
      quantity: rows[i].QTY,
      serials
    });
  }

  return datas;
};

export default getSpreadsheetData;
