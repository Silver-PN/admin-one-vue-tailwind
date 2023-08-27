const qrOptions = { color: { dark: "#0000", light: "#FFA500", }, logo: { src:
"https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png",
// Replace with the path to your logo image width: 80, // Adjust logo width
height: 80, // Adjust logo height }, }; qrcode.toDataURL(jsonString, qrOptions,
(err, qrCodeDataURL) => { if (err) { console.error(err); return; } qrCode.value
= qrCodeDataURL; });
