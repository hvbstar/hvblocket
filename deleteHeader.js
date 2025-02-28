// Updated deleteHeader.js
// ========= Xóa Header Gây Lỗi ========= //
const version = 'V1.0.5';

function setHeaderValue(headers, key, value) {
  var lowerKey = key.toLowerCase();
  headers[lowerKey] = value;
}

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers;

// Xóa giá trị của X-RevenueCat-ETag
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

// Debug: In header đã sửa
console.log("✅ Modified Headers:", JSON.stringify(modifiedHeaders, null, 2));

// Trả kết quả với header đã chỉnh sửa
$done({ headers: modifiedHeaders });

// ========= Hoàng Văn Bảo ========= //
