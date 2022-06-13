import socket from './ws-client';
import {UserStore, MessageStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';


const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';


let userStore = new UserStore('x-Chattrbox/u');

const messageCache = [];

let username = userStore.get();
if(!username) {
  username = promptForUsername();
  userStore.set(username);
}


class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);
    socket.init('ws://localhost:3001');

    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        console.log("Dentro init " + data);
        let message = new ChatMessage(data);
        socket.sendMessage(message.serialize());
      });
      this.chatList.init();
    });

    socket.registerMessageHandler((data) => {
      console.log("Dentro register " + JSON.stringify(data));
      let message = new ChatMessage(data.message);
      console.log("Dentro register serializao " + message.serialize());
      this.chatList.drawMessage(message.serialize());
      let uuid = 'x-Chattrbox/' + Math.floor(Math.random() * 100);
      let messageStore = new MessageStore(uuid);
      messageStore.set(JSON.stringify(message.serialize()));
      messageCache.push(messageStore);
      window.sessionStorage.setItem("messages", JSON.stringify(messageCache));
    });

    socket.registerClosedHandler(() => {
      console.log('definetely closed!');
    });

    var storedArray = JSON.parse(window.sessionStorage.getItem("messages"));
    for (let i = 0; i < storedArray.length; i++) {
      console.log(window.sessionStorage.getItem(storedArray[i].key));
      let message = JSON.parse(window.sessionStorage.getItem(storedArray[i].key));
      console.log(message.message + " " +  message.user+ " " + message.timestamp)
      let messaggione = new ChatMessage(message.message,message.user,message.time);
      this.chatList.drawMessage(messaggione.serialize());
    }

  }
}

class ChatMessage {
  constructor(message, user='batman', timestamp=(new Date()).getTime()) {
  this.message = message;
  this.user = username;
  this.timestamp = timestamp;
  console.log("Dentro constructor " + this.message);
  }
  serialize() {

    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
