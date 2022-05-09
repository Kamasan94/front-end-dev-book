var WebSocket = require('ws');

var chatClient = new WebSocket('ws://localhost:3001?chatbot=true');

chatClient.on('open', function open() {
  chatClient.send('Hello, I\'m Jinx!')
})


chatClient.on('message', function(data) {
  if(data.toString().substring(0,4) == 'Jinx') {
    chatClient.send('Welcome to a new User!');
  }
});

module.exports = chatClient;
