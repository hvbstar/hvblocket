try {
  let obj = JSON.parse($response.body);

  // Tạo dữ liệu log
  let logData = {
    timestamp: new Date().toISOString(),
    apiResponse: JSON.stringify(obj, null, 2)
  };

  // Gửi log đến server log (cần có API của dịch vụ log)
  $httpClient.post({
    url: 'https://your-log-server.com/api/logs', // Thay bằng URL của dịch vụ log của bạn
    body: logData
  }, function(error, response, body) {
    if (error) {
      console.error("Error sending log:", error);
    } else {
      console.log("Log sent successfully.");
    }
  });

  // Trả lại phản hồi gốc
  $done({ body: JSON.stringify(obj) });

} catch (error) {
  console.error("Error parsing response:", error);
  $done({});
}
