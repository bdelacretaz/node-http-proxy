// HTTP Proxy which adds an Authorization header
// Based on an example from https://github.com/nodejitsu/node-http-proxy

var http = require('http'),
    httpProxy = require('http-proxy');

var listenPort = 8081;
var authValue = 'Basic YWRtaW46YWRtaW4=';
var targetURL = 'http://127.0.0.1:4502/';
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Authorization', authValue);
});

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
    target: targetURL
  });
});

console.log("listening on port " + listenPort + " and proxying to " + targetURL)
server.listen(listenPort);