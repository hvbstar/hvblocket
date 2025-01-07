// Chỉnh sửa lại header của yêu cầu
const version = 'V1.0.3';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

var modifiedHeaders = $request.headers;

// Đảm bảo rằng các headers được sửa đúng cách
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", ""); // Xóa header

// In ra log để kiểm tra header đã sửa
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));

// Kết thúc request với header đã sửa đổi
$done({ headers: modifiedHeaders });
