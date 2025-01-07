// Locket_extra_features.js - Unlock Video 15s & Badge
let obj = JSON.parse($response.body);

// Enable Locket badge (gold heart)
if (!obj.features) obj.features = {};
obj.features.badge = true;

// Enable 15s video recording
obj.features.video_duration = 15;

// Log the modified features for debugging
console.log("Modified Features:", JSON.stringify(obj, null, 2));

$done({ body: JSON.stringify(obj) });
