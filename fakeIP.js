// ========= Fake IP Mỹ cho Locket ========= //
var modifiedHeaders = $request.headers;

// Kiểm tra xem có phải request đến Locket hay không
if ($request.url.includes("locket.camera") || $request.url.includes("locket-api")) {
    modifiedHeaders["X-Forwarded-For"] = "104.28.1.1"; // IP Mỹ
    modifiedHeaders["CF-Connecting-IP"] = "104.28.1.1";
    modifiedHeaders["True-Client-IP"] = "104.28.1.1";

    // Debug: In ra log để kiểm tra
    console.log("✅ Fake IP Mỹ đã được áp dụng:", JSON.stringify(modifiedHeaders, null, 2));
}

$done({ headers: modifiedHeaders });

// ========= Hoàng Văn Bảo ========= //
