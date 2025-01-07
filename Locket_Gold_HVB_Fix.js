// Updated Locket_hvb_fix.js - Unlock Gold, Badge & Video 15s
var specificDate = "2025-01-01T00:00:00Z"; 

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("Error parsing response:", e);
  $done({ body: JSON.stringify({ error: "Failed to parse response" }) });
}

if (!obj.subscriber) {
  obj.subscriber = {};
}
if (!obj.subscriber.entitlements) {
  obj.subscriber.entitlements = {};
}
if (!obj.subscriber.subscriptions) {
  obj.subscriber.subscriptions = {};
}

// Tạo dữ liệu giả lập cho Hoàng Văn Bảo
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

// Thêm entitlements và subscriptions vào response
obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
obj.subscriber.entitlements["Locket"] = hvb_entitlement;

// Mở khóa huy hiệu Locket và video 15 giây
obj.subscriber.entitlements["Locket_Badge"] = {
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.badge",
  expires_date: "2099-12-18T01:04:17Z"
};

obj.subscriber.entitlements["Locket_Video_15s"] = {
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.video.15s",
  expires_date: "2099-12-18T01:04:17Z"
};

console.log("Modified Response:", JSON.stringify(obj, null, 2));
$done({ body: JSON.stringify(obj) });
