// Tệp kiểm tra phản hồi API
try {
  let obj = JSON.parse($response.body);

  // Kiểm tra xem các tính năng cần thiết có trong phản hồi không
  console.log("API Response:", JSON.stringify(obj, null, 2));

  // Kiểm tra entitlements và subscriptions
  if (obj.subscriber) {
    console.log("Subscriber Data:", JSON.stringify(obj.subscriber, null, 2));

    // Kiểm tra entitlements
    if (obj.subscriber.entitlements) {
      console.log("Entitlements Data:", JSON.stringify(obj.subscriber.entitlements, null, 2));
    }

    // Kiểm tra subscriptions
    if (obj.subscriber.subscriptions) {
      console.log("Subscriptions Data:", JSON.stringify(obj.subscriber.subscriptions, null, 2));
    }
  }

  // Kiểm tra các tính năng mở khóa
  if (obj.features) {
    console.log("Features Data:", JSON.stringify(obj.features, null, 2));
  }

  // Trả lại phản hồi gốc
  $done({ body: JSON.stringify(obj) });
} catch (error) {
  console.error("Error parsing response:", error);
  $done({});
}
