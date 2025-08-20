/***** deleteHeader.js — Strip cache/etag to avoid 304 *****/
// Tác giả: Hoàng Văn Bảo (HVB)
const H = $request.headers || {};

function del(k) {
  if (k in H) delete H[k];
  const low = k.toLowerCase();
  if (low in H) delete H[low];
}
function set(k, v) { H[k] = v; }

[
  "If-None-Match",
  "X-RevenueCat-ETag",
  "If-Modified-Since",
  "X-Use-ETag",
  "ETag"
].forEach(del);

// Đặt thêm các header vô hiệu hoá cache
set("Cache-Control", "no-cache");
set("Pragma", "no-cache");

// (Tuỳ chọn) Khai báo nền tảng để tránh phân nhánh bất thường phía server
if (!H["X-Platform"]) set("X-Platform", "iOS");

$done({ headers: H });
