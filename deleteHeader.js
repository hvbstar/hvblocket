// Updated deleteHeader.js
// ========= Header Modification ========= //
const version = 'V1.0.4';

function setHeaderValue(headers, key, value) {
  var lowerKey = key.toLowerCase();
  headers[lowerKey] = value;
}

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers;

// Thay đổi giá trị của X-RevenueCat-ETag
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

// Debug: In header đã sửa
console.log("✅ Modified Headers:", JSON.stringify(modifiedHeaders, null, 2));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });

// ========= Hoàng Văn Bảo ========= //
