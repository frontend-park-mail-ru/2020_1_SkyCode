import BaseController from './BaseController.js';
import SupportChatView from '../render/views/SupportChatView/SupportChatView.js';
import EventBus from '../services/Events/EventBus';
import Message from '../render/blocks/message/message';

class SupportChatController extends BaseController {
    constructor(title = 'support chat') {
        super(title);
    }

    execute(matchData) {
        // const socket = new WebSocket('ws://89.208.199.114:5000/api/v1/chat');

        const chatId = matchData[0];

        console.log("ID",chatId);
        if (chatId !== undefined) {
            this.socket = new WebSocket(`ws://89.208.199.114:5000/api/v1/chats/${chatId}/join`);
        }
        if (chatId === undefined) {
            this.socket = new WebSocket('ws://89.208.199.114:5000/api/v1/chat');
        }

        this.socket.onopen = function(e) {
            console.log('WebSocket Open');
            EventBus.publish('websock-conn', {});
        };

        this.socket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);
            localStorage.setItem('chat_id', data.chat_id);
            localStorage.setItem('full_name', data.full_name);
            if (data.message) {
                EventBus.publish('new-message', data);
                const el = new Message('msg', data.message, data.full_name);
                let domEl = document.getElementsByClassName('chat__messages')[0];
                domEl.innerHTML += el;

                domEl.scrollTop = domEl.scrollHeight;

                document.getElementsByClassName('chat__messages')[0].outerHTML = domEl.outerHTML;
            }
        };
        super.execute(new SupportChatView());

    }

    startCatchEvents() {
        EventBus.subscribe('send-message', this.SendMessage.bind(this));
        EventBus.subscribe('websock-conn', this.InitialMsg.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('send-message', this.SendMessage.bind(this));
        EventBus.unsubscribe('websock-conn', this.InitialMsg.bind(this));
    }

    SendMessage(data) {
        console.log(data);
        this.socket.send(data);
    }

    InitialMsg() {
        this.socket.send(JSON.stringify({full_name: 'Philipp'}));
    }
}

export default new SupportChatController();
