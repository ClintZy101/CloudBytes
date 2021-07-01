import creds from "app/config/cloud-mobile-app-318506-de8cb0e43819.json";
const { GoogleSpreadsheet } = require("google-spreadsheet");

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet(
  "181qB9a0a7MKna-CTYrYZNRjYsUOmpWu5ExKgYLcoHWE"
);

export default async ({ app, router, store }) => {
  await doc.useServiceAccountAuth(creds);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  });
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
};
