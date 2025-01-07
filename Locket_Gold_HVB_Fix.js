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
  $done({});  // Exit early if there's an error parsing the response
}

// Ensure the necessary keys exist
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

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

// Apply the mapping
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

// Unlock Locket Badge
obj.subscriber.entitlements["Locket_Badge"] = {
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.badge",
  expires_date: "2099-12-18T01:04:17Z"
};

// Allow 15s video recording
obj.subscriber.entitlements["Locket_Video_15s"] = {
  purchase_date: specificDate,
  product_identifier: "com.hoangvanbao.video.15s",
  expires_date: "2099-12-18T01:04:17Z"
};

// Log success message
obj.Attention = "Chúc mừng Hoàng Văn Bảo! Huy hiệu Locket & Video 15s đã được bật.";
console.log("Modified Response:", JSON.stringify(obj, null, 2));

$done({ body: JSON.stringify(obj) });
