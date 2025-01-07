// Monitor HTTP Requests - Theo dõi các yêu cầu gửi đi và phản hồi nhận được

const debug = true; // Bật chế độ gỡ lỗi

if (debug) {
  // In ra URL, headers và body của request để theo dõi
  console.log("Request URL:", $request.url);
  console.log("Request Headers:", JSON.stringify($request.headers, null, 2));
  console.log("Request Body:", JSON.stringify($request.body, null, 2));
}

let obj = {};

// Kiểm tra và xử lý lỗi khi phản hồi không hợp lệ
try {
  obj = JSON.parse($response.body);
} catch (e) {
  console.error("Error parsing response:", e);
  $done({});
  return;
}

// Kiểm tra URL và xử lý yêu cầu tương ứng
if ($request.url.includes("receipts") || $request.url.includes("subscribers")) {
  console.log("Matched API for Receipts/Subscribers");

  // Mở khóa các tính năng cần thiết
  obj.subscriber.entitlements["Locket_Badge"] = {
    purchase_date: "2025-01-01T00:00:00Z",
    product_identifier: "com.hoangvanbao.badge",
    expires_date: "2099-12-18T01:04:17Z"
  };

  obj.subscriber.entitlements["Locket_Video_15s"] = {
    purchase_date: "2025-01-01T00:00:00Z",
    product_identifier: "com.hoangvanbao.video.15s",
    expires_date: "2099-12-18T01:04:17Z"
  };
}

if (debug) {
  // In ra phản hồi đã được sửa đổi để kiểm tra
  console.log("Modified Response:", JSON.stringify(obj, null, 2));
}

// Kết thúc và trả lại phản hồi đã được sửa đổi
$done({ body: JSON.stringify(obj) });
