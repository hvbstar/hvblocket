/***** Locket_hvb_fix.js — Optimized for Locket 2.9.x *****/
// Tác giả: Hoàng Văn Bảo (HVB)

const specificDate = "2025-01-01T00:00:00Z";          // Ngày join giả lập
const farFuture = "2099-12-31T23:59:59Z";             // Hạn dùng rất xa

function safeParse(body) {
  try { return JSON.parse(body || "{}"); } catch { return {}; }
}
function nowISO() { return new Date().toISOString(); }

const url = $request?.url || "";
const headers = $response?.headers || {};
let bodyObj = safeParse($response?.body);

// Lấy app_user_id nếu có trong URL /subscribers/<id>
let appUserId = null;
try {
  const m = url.match(/\/v1\/subscribers\/([^\/\?]+)/);
  if (m && m[1]) appUserId = decodeURIComponent(m[1]);
} catch {}

/* Khối entitlement/subscription mẫu */
const entitlementKeys = [
  "Gold",
  "Locket",
  "vip+watch_vip",
  "premium",
  "plus",
];

const productId = "com.hoangvanbao.premium.yearly";

const subscriptionPayload = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  store: "app_store",
  unsubscribe_detected_at: null,
  grace_period_expires_date: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  expires_date: farFuture,
};

const entitlementPayload = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: productId,
  expires_date: farFuture,
};

/* Tạo skeleton subscriber nếu thiếu */
function ensureSubscriber(o) {
  if (!o.subscriber) o.subscriber = {};
  const s = o.subscriber;
  if (!s.entitlements) s.entitlements = {};
  if (!s.subscriptions) s.subscriptions = {};
  if (!s.original_app_user_id && appUserId) s.original_app_user_id = appUserId;
  if (!s.first_seen) s.first_seen = specificDate;
  if (!s.original_application_version) s.original_application_version = "1";
  if (!s.management_url) s.management_url = "https://apps.apple.com/account/subscriptions";
  if (!s.non_subscriptions) s.non_subscriptions = {};
  return o;
}

/* Bơm entitlements/subscriptions đầy đủ */
function injectEntitlements(o) {
  ensureSubscriber(o);
  const s = o.subscriber;

  // Giữ id gốc nếu server trả về, không ép buộc trừ khi rỗng
  if (!s.original_app_user_id) s.original_app_user_id = appUserId || "$RCAnonymousID:hvb";

  // Bơm subs
  s.subscriptions[productId] = Object.assign({}, subscriptionPayload);

  // Bơm mọi entitlement key có thể
  entitlementKeys.forEach(k => {
    s.entitlements[k] = Object.assign({ product_identifier: productId }, entitlementPayload);
  });

  // Tối giản latest_receipt_info để một số app ngừng cảnh báo
  s.latest_receipt_info = s.latest_receipt_info || [{
    product_id: productId,
    purchase_date: specificDate,
    expires_date: farFuture,
    ownership_type: "PURCHASED",
  }];

  // Đánh dấu thời điểm cập nhật
  o.hvb_patched_at = nowISO();
  return o;
}

/* Nếu là offerings: ta không cần sửa nhiều, chỉ đảm bảo app không “khóa” UI */
function patchOfferings(o) {
  // Thường offerings có cấu trúc packages/available_packages; ta có thể pass-through,
  // hoặc đảm bảo có ít nhất một package để app không báo lỗi.
  if (!o.current_offering_id) o.current_offering_id = "gold";
  if (!o.offerings) o.offerings = [{ identifier: "gold", packages: ["annual"] }];
  o.hvb_offerings_patched = true;
  return o;
}

/* Quyết định theo endpoint */
if (/\/v1\/receipts$/.test(url)) {
  // Ép trả về subscriber đầy đủ khi app gửi biên nhận
  bodyObj = injectEntitlements(bodyObj || {});
} else if (/\/v1\/subscribers\/[^\/]+$/.test(url)) {
  bodyObj = injectEntitlements(bodyObj || {});
} else if (/\/v1\/subscribers\/[^\/]+\/offerings$/.test(url)) {
  bodyObj = patchOfferings(bodyObj || {});
} else {
  // Dự phòng
  bodyObj = injectEntitlements(bodyObj || {});
}

// Xoá ETag ở response để tránh client cache hoá cứng
if (headers && (headers["ETag"] || headers["etag"])) {
  delete headers["ETag"];
  delete headers["etag"];
}
headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
headers["Pragma"] = "no-cache";
headers["Expires"] = "0";

$done({ body: JSON.stringify(bodyObj), headers });
