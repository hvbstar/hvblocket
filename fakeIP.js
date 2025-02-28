// ========= Fake IP Mỹ cho Locket ========= //
var modifiedHeaders = $request.headers;
modifiedHeaders["X-Forwarded-For"] = "104.28.1.1"; // IP giả lập từ Mỹ
modifiedHeaders["CF-Connecting-IP"] = "104.28.1.1";
modifiedHeaders["True-Client-IP"] = "104.28.1.1";

// Debug: Log IP giả lập
console.log("✅ Fake IP Mỹ đã được áp dụng:", JSON.stringify(modifiedHeaders, null, 2));

$done({ headers: modifiedHeaders });

// ========= Hoàng Văn Bảo ========= //
