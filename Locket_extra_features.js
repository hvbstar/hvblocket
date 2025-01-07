let obj = JSON.parse($response.body);

// Bật huy hiệu Locket (trái tim vàng)
if (!obj.features) obj.features = {};
obj.features.badge = true;

// Bật quay video 15 giây
obj.features.video_duration = 15;

$done({ body: JSON.stringify(obj) });
