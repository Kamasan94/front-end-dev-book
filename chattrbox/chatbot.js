var WebSocket = require('ws');

var chatClient = new WebSocket('ws://localhost:3001?chatbot=true');

chatClient.on('open', function open() {
  chatClient.send('Hello, I\'m Jinx!');
  chatClient.send('pesce');
})


chatClient.on('message', function(data) {
  console.log('ricevuto ' + data);
  if(data.toString().substring(0,4) == 'Jinx') {
    chatClient.send('Welcome to a new User!');
  }
  //From here, if the string contains Jinx as first word, chatbot commands
});

module.exports = chatClient;
