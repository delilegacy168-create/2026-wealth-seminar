# 2026 財富講座報名

本專案為 2026 財富講座活動報名網站，使用靜態 HTML + CSS + JavaScript，並搭配 Google Apps Script 將報名資料寫入 Google Sheets。

## Pages 網址

- https://delilegacy168-create.github.io/2026-wealth-seminar/

## 本機測試

1. 於專案根目錄啟動靜態伺服器：
   python -m http.server 8000
2. 開啟瀏覽器訪問：
   http://localhost:8000
3. 確認三列排版與表單顯示正常。

## Google Apps Script 設定

已完成 Web 應用程式部署，報名表會將資料寫入 Google Sheet「2026 財富講座」。欄位為姓名、Email、單位、電話、職稱；電話欄以文字格式儲存。已用兩筆測試資料確認送出成功。

## 佈署注意事項

- 不要推送 spec 資料夾。
- 使用 GitHub Pages 佈署後，將實際網址更新至本檔案。
- 若尚未完成 GitHub / Google 授權，請先完成登入與授權後再繼續部署。
