// Ghi lại phản hồi API vào file log

const fs = require('fs');
const logFile = '/path/to/your/logfile.txt'; // Đường dẫn tới file log

let obj = JSON.parse($response.body);

// Ghi lại phản hồi vào file
fs.appendFileSync(logFile, `\n\n[${new Date().toISOString()}] API Response: \n${JSON.stringify(obj, null, 2)}`);

$done({ body: JSON.stringify(obj) });
