// ========= Fake IP Mỹ cho Locket ========= //
var modifiedHeaders = $request.headers;
modifiedHeaders["X-Forwarded-For"] = "104.28.1.1"; // IP giả định từ Mỹ
modifiedHeaders["CF-Connecting-IP"] = "104.28.1.1";
modifiedHeaders["True-Client-IP"] = "104.28.1.1";

console.log("Fake IP Mỹ đã được áp dụng!");
$done({ headers: modifiedHeaders });

// ========= Hoàng Văn Bảo ========= //
