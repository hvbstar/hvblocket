// Monitor HTTP Requests - Theo dõi các yêu cầu gửi đi và phản hồi nhận được

const debug = true; // Bật chế độ gỡ lỗi

if (debug) {
  console.log("Request URL:", $request.url);
  console.log("Request Headers:", JSON.stringify($request.headers, null, 2));
  console.log("Request Body:", JSON.stringify($request.body, null, 2));
}

let obj = JSON.parse($response.body);

// Kiểm tra URL và xử lý yêu cầu tương ứng
if ($request.url.includes("receipts") || $request.url.includes("subscribers")) {
  console.log("Matched API for Receipts/Subscribers");

  // Thêm các xử lý cần thiết tại đây
  obj.subscriber.entitlements["Locket_Badge"] = {
    purchase_date: "2025-01-01T00:00:00Z",
    product_identifier: "com.hoangvanbao.badge",
    expires_date: "2099-12-18T01:04:17Z"
  };

  obj.subscriber.entitlements["Locket_Video_15s"] = {
    purchase_date: "2025-01-01T00:00:00Z",
    product_identifier: "com.hoangvanbao.video.15s",
    expires_date: "2099-12-18T01:04:17Z"
  };
}

if (debug) {
  console.log("Modified Response:", JSON.stringify(obj, null, 2));
}

$done({ body: JSON.stringify(obj) });
