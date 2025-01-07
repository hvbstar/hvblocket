// Updated Locket_hvb_fix.js - Unlock Gold, Badge & Video 15s
var specificDate = "2025-01-01T00:00:00Z"; // Cập nhật ngày cụ thể

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("Error parsing response:", e);
  $done({});
}

// Đảm bảo các key tồn tại
obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};

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
  product_identifier: "com.hoangvanbao.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Áp dụng Mapping
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let entitlementKey = mapping[match][0] || "Locket";
  let subscriptionKey = mapping[match][1] || "com.hoangvanbao.premium.yearly";

  obj.subscriber.subscriptions[subscriptionKey] = hoangvanbao;
  obj.subscriber.entitlements[entitlementKey] = hvb_entitlement;
} else {
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  obj.subscriber.entitlements["Locket"] = hvb_entitlement;
}

// Mở khóa huy hiệu Locket
obj.subscriber.entitlements["Locket_Badge"] = {
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.badge",
  expires_date: "2099-12-18T01:04:17Z"
};

// Cho phép quay video 15 giây
obj.subscriber.entitlements["Locket_Video_15s"] = {
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.video.15s",
  expires_date: "2099-12-18T01:04:17Z"
};

// Log thông báo chi tiết hơn
console.log("Modified Response:", JSON.stringify(obj, null, 2));
console.log("User-Agent:", ua);
console.log("Updated Subscription:", JSON.stringify(obj.subscriber.subscriptions, null, 2));

// Thông báo hoàn thành
obj.Attention = "Chúc mừng Hoàng Văn Bảo! Huy hiệu Locket & Video 15s đã được bật.";

// Kết thúc với dữ liệu đã sửa đổi
$done({ body: JSON.stringify(obj) });
