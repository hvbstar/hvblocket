// Locket_extra_features.js - Unlock Video 15s & Badge
let obj = JSON.parse($response.body);

// Bật huy hiệu Locket (trái tim vàng)
if (!obj.features) obj.features = {};
obj.features.badge = true;

// Bật quay video 15 giây
obj.features.video_duration = 15;

// In ra log để kiểm tra
console.log("Modified Features:", JSON.stringify(obj, null, 2));

$done({ body: JSON.stringify(obj) });
