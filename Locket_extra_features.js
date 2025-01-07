// Locket_extra_features.js - Enable Badges & Video 15s
const response = JSON.parse($response.body);

// Bật huy hiệu Locket
response.features = response.features || {};
response.features.badge = true;

// Cho phép quay video 15s
response.features.video_duration = 15;

console.log("Extra Features Enabled:", JSON.stringify(response, null, 2));

$done({ body: JSON.stringify(response) });