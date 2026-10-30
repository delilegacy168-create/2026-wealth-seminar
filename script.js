const form = document.getElementById("signup-form");
const message = document.getElementById("form-message");
const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxV-MT8jBsBiCuNGjI98z3_jbsY8oMHO8th9lU3xExn63FwSOXe3NLaiG_m4u8JrzNr/exec";

const showMessage = (text, type = "") => {
  message.textContent = text;
  message.className = "form-message" + (type ? ` ${type}` : "");
};

const validateForm = (payload) => {
  if (!payload.name || !payload.email || !payload.phone) {
    return "請填寫姓名、Email 與電話。";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(payload.email)) {
    return "Email 格式不正確。";
  }

  return "";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    name: formData.get("name")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    department: formData.get("department")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    title: formData.get("title")?.toString().trim() || "",
  };

  const validationError = validateForm(payload);
  if (validationError) {
    showMessage(validationError, "error");
    return;
  }

  if (!APP_SCRIPT_URL || APP_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")) {
    showMessage("請先在 script.js 中填入 Google Apps Script Web App URL 後再送出。", "error");
    return;
  }

  try {
    showMessage("資料送出中，請稍候...", "");

    const response = await fetch(APP_SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("發生錯誤");
    }

    const result = await response.json().catch(() => ({}));
    if (result.ok) {
      form.reset();
      showMessage("報名成功，資料已送出！", "success");
      return;
    }

    throw new Error(result.message || "資料儲存失敗");
  } catch (error) {
    showMessage(error.message || "資料送出失敗，請稍後再試。", "error");
  }
});
