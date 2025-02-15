var http = require("https");

var options = {
  "method": "POST",
  "hostname": [
    "fcm",
    "googleapis",
    "com"
  ],
  "path": [
    "fcm",
    "send"
  ],
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "key=AIzaSyDPPeZDu6EuOdRJzY7326_-8rgJw7fvWm4",
    "User-Agent": "PostmanRuntime/7.20.1",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Postman-Token": "4202598c-b262-4ca7-88d0-2283991c2371,21a901f4-5435-4a52-8da6-12a66a3dea8b",
    "Host": "fcm.googleapis.com",
    "Accept-Encoding": "gzip, deflate",
    "Content-Length": "265",
    "Connection": "keep-alive",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
  });
});
