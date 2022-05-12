var WebSocketServer = require('ws').Server;
var port = 3001;
var wss = new WebSocketServer({
  port: port
});

var chatBotId;

var chatClient = require('./chatbot');

//Log of old messages
var messages = [];

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

console.log('websockets server started');

wss.on('connection', function connection(ws, req) {
  console.log('client connection established');

  ws.id = wss.getUniqueID();
  ws.isEnabled = false;

  if (req != null) {
    if(req.url.includes('chatbot')) {
      ws.isEnabled = true;
      chatBotId = ws.id;
    }
  }

  ws.on('message', function(data) {


  console.log('message received: ' + data);
    if (data == 'pesce') {
      ws.isEnabled = true;
      messages.forEach(function (msg) {
        ws.send(msg);
      });
    }

    if (ws.isEnabled) {
      if(data.toString().substring(0,4) == 'Jinx') {
        wss.clients.forEach(function each(client) {
          if (client.id == chatBotId) {
            client.send(data);
          }
        })
      }
      else {
        messages.push(data);
        wss.clients.forEach(function (clientSocket) {
          clientSocket.send(data);
        })
      }

    }
    else {
      wss.clients.forEach(function each(client) {
        if (client.id == ws.id) {
          client.send('You are not enabled to see messages, enter password');
        }
      })
    }

  })


});
