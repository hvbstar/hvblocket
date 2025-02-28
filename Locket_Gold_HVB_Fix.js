// Updated Locket_Gold_HVB_Fix.js
// ========= Đặt ngày tham gia là 28/02/2025 ========= //
var specificDate = "2025-02-28T00:00:00Z"; // Định dạng ISO 8601

// ========= Kiểm tra và Khởi tạo ========= //
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("❌ Lỗi phân tích JSON:", e);
  $done({});
}

// Đảm bảo cấu trúc JSON tồn tại
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

// ========= Tạo thông tin gói Locket Gold ========= //
var hoangvanbao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "app_store"
};

var hvb_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "locket.gold.subscription",
  expires_date: "2099-12-18T01:04:17Z"
};

// ========= Gán Locket Gold vào JSON ========= //
obj.subscriber.subscriptions["locket.gold.subscription"] = hoangvanbao;
obj.subscriber.entitlements["Locket Gold"] = hvb_entitlement;

// ========= In Log để Debug ========= //
console.log("✅ Locket Gold Đã Kích Hoạt!", JSON.stringify(obj, null, 2));

// ========= Trả kết quả cuối cùng ========= //
$done({ body: JSON.stringify(obj) });

// ========= Hoàng Văn Bảo ========= //
