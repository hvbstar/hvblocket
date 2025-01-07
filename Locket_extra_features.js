// Locket_extra_features.js - Enable Badges & Video 15s
try {
  const response = JSON.parse($response.body);

  // Kiểm tra và khởi tạo các thuộc tính nếu chưa có
  response.features = response.features || {};

  // Bật huy hiệu Locket (trái tim vàng)
  response.features.badge = response.features.badge || true;

  // Cho phép quay video 15s
  response.features.video_duration = response.features.video_duration || 15;

  // In ra log để kiểm tra các tính năng đã bật
  console.log("Extra Features Enabled:", JSON.stringify(response, null, 2));

  // Kết thúc và trả về phản hồi đã chỉnh sửa
  $done({ body: JSON.stringify(response) });

} catch (error) {
  // Xử lý lỗi phân tích cú pháp JSON
  console.error("Error parsing response:", error);
  $done({});
}
