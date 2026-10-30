function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, message: "Google Apps Script is ready." }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const spreadsheetName = "2026 財富講座";
    const headers = ["姓名", "Email", "單位", "電話", "職稱"];

    let spreadsheet = null;
    const files = DriveApp.getFilesByName(spreadsheetName);
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.open(files.next());
    }

    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create(spreadsheetName);
    }

    let sheet = spreadsheet.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      const needsHeader = firstRow.some((cell, index) => (cell || "").toString().trim() !== headers[index]);
      if (needsHeader) {
        sheet.getRange(1, 1, 1, headers.length).clear();
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }

    const row = [
      payload.name || "",
      payload.email || "",
      payload.department || "",
      payload.phone || "",
      payload.title || "",
    ];

    sheet.appendRow(row);

    const phoneColumn = headers.indexOf("電話") + 1;
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, phoneColumn, lastRow - 1, 1).setNumberFormat("@");
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true, message: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, message: error.message || "Unknown error" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
