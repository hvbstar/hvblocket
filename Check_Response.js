// Tệp kiểm tra phản hồi API
let obj = JSON.parse($response.body);

// Kiểm tra xem các tính năng cần thiết có trong phản hồi không
console.log("API Response:", JSON.stringify(obj, null, 2));

// Kiểm tra entitlements và subscriptions
if (obj.subscriber) {
  console.log("Subscriber Data:", JSON.stringify(obj.subscriber, null, 2));
}

// Kiểm tra các tính năng mở khóa
if (obj.features) {
  console.log("Features Data:", JSON.stringify(obj.features, null, 2));
}

$done({ body: JSON.stringify(obj) });
