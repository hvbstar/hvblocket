// Updated deleteHeader.js
// ========= Header Modification ========= //
const version = 'V1.0.4'; // Cập nhật phiên bản

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

// Lấy headers hiện tại từ request
var modifiedHeaders = $request.headers;

// Xóa hoặc thay đổi các header cần thiết
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", ""); // Xóa X-RevenueCat-ETag

// Nếu muốn thay đổi nhiều header, thêm chúng vào đây
setHeaderValue(modifiedHeaders, "Authorization", ""); // Ví dụ: xóa Authorization header

// Debug: In header gốc và header đã sửa để kiểm tra
console.log("Original Headers:", JSON.stringify($request.headers, null, 2));
console.log("Modified Headers:", JSON.stringify(modifiedHeaders, null, 2));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });
