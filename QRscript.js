document.getElementById("generate-btn").addEventListener("click", generateQRCode);
document.getElementById("copy-btn").addEventListener("click", copyCredentials);
document.getElementById("download-btn").addEventListener("click", downloadQRCode);

function generateQRCode() {
  const ssid = document.getElementById("wifi-name").value.trim();
  const password = document.getElementById("wifi-password").value.trim();
  const encryption = document.getElementById("encryption-type").value.trim();

  if (!ssid) {
    alert("Please enter WiFi name (SSID)!");
    return;
  }

  const qrText = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

  const qrContainer = document.getElementById("qr-container");
  qrContainer.innerHTML = "";

  const qr = new QRious({
    element: document.createElement("canvas"),
    value: qrText,
    size: 200,
    foreground: "#3a7bd5",
    background: "#ffffff",
  });

  qrContainer.appendChild(qr.element);
}

function copyCredentials() {
  const ssid = document.getElementById("wifi-name").value.trim();
  const password = document.getElementById("wifi-password").value.trim();

  if (!ssid) {
    alert("Please enter WiFi name (SSID)!");
    return;
  }

  const text = `SSID: ${ssid}\nPassword: ${password}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("WiFi credentials copied to clipboard!");
  });
}

function downloadQRCode() {
  const qrCanvas = document.querySelector("#qr-container canvas");
  if (!qrCanvas) {
    alert("Generate a QR code first!");
    return;
}

  const link = document.createElement("a");
  link.href = qrCanvas.toDataURL();
  link.download = "wifi-qr-code.png";
  link.click();
}