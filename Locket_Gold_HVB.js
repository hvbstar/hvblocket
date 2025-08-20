/***** Locket Gold — Quantumult X persistent edition *****/
/***** Tác giả: Hoàng Văn Bảo (HVB) *****/

const specificDate = "2025-01-01T00:00:00Z";
const farFuture   = "2099-12-31T23:59:59Z";
const productId   = "com.hoangvanbao.premium.yearly";
const entitlementKeys = ["Gold", "Locket", "vip+watch_vip", "premium", "plus"];

function nowISO() { return new Date().toISOString(); }

// Tạo response chuẩn Gold
function genGold(appUserId) {
  let subscriber = {
    original_app_user_id: appUserId || "$RCAnonymousID:hvb",
    first_seen: specificDate,
    original_application_version: "1",
    management_url: "https://apps.apple.com/account/subscriptions",
    non_subscriptions: {},
    subscriptions: {},
    entitlements: {},
    latest_receipt_info: [{
      product_id: productId,
      purchase_date: specificDate,
      expires_date: farFuture,
      ownership_type: "PURCHASED",
    }]
  };

  subscriber.subscriptions[productId] = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    store: "app_store",
    unsubscribe_detected_at: null,
    grace_period_expires_date: null,
    original_purchase_date: specificDate,
    purchase_date: specificDate,
    expires_date: farFuture
  };

  entitlementKeys.forEach(k => {
    subscriber.entitlements[k] = {
      product_identifier: productId,
      purchase_date: specificDate,
      expires_date: farFuture
    };
  });

  return { subscriber, hvb_patched_at: nowISO() };
}

// =========== MAIN =========== //
const url = $request.url;
let body = $response.body || "{}";
let obj;

try {
  obj = JSON.parse(body);
} catch {
  obj = {};
}

let appUserId = null;
const m = url.match(/\/v1\/subscribers\/([^\/\?]+)/);
if (m && m[1]) appUserId = decodeURIComponent(m[1]);

let patched;

// Kiểm tra cache trước
let cacheKey = "HVB_Locket_Gold";
let cached = $persistentStore.read(cacheKey);

if (cached) {
  try { patched = JSON.parse(cached); } catch {}
}

// Nếu chưa có cache thì tạo mới và lưu
if (!patched) {
  if (/\/v1\/subscribers\/[^\/]+\/offerings$/.test(url)) {
    obj.current_offering_id = "gold";
    obj.offerings = [{ identifier: "gold", packages: ["annual"] }];
    patched = obj;
  } else {
    patched = genGold(appUserId);
  }
  $persistentStore.write(JSON.stringify(patched), cacheKey);
}

// Xóa cache headers để tránh 304
let headers = $response.headers || {};
delete headers["ETag"];
delete headers["etag"];
headers["Cache-Control"] = "no-cache, no-store, must-revalidate";

$done({ body: JSON.stringify(patched), headers });
