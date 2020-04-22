import BaseController from './BaseController.js';
import SupportChatView from '../render/views/SupportChatView/SupportChatView.js';
import EventBus from '../services/Events/EventBus';
import Message from '../render/blocks/message/message';
import UserModel from '../models/UserModel';

class SupportChatController extends BaseController {
    constructor(title = 'support chat') {
        super(title);
        this.countuser = 0;
    }

    execute(matchData) {
        // const socket = new WebSocket('ws://89.208.199.114:5000/api/v1/chat');

        const chatId = matchData[0];

        console.log('ID', chatId);
        if (chatId !== undefined) {
            this.socket = new WebSocket(`ws://89.208.199.114:5000/api/v1/chats/${chatId}/join`);
        }
        if (chatId === undefined) {
            this.socket = new WebSocket('ws://89.208.199.114:5000/api/v1/chat');
        }

        // this.socket.onopen = function(e) {
        //     console.log('WebSocket Open');
        //     EventBus.publish('websock-conn', {});
        // };

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
            if (data.joined) {
                this.countuser++;
                if (this.countuser === 2) {
                    EventBus.publish('support-connected', {});
                }
            }

        };

        UserModel.getUser()
            .then((response) => {
                if (response.User) {
                    this.username = response.User.firstName;
                    this.socket.send(JSON.stringify({full_name: this.username}));
                    super.execute(new SupportChatView({username: response.User.firstName}));
                } else {
                    super.execute(new SupportChatView({}));
                }
            })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe('send-msg', this.SendMessage.bind(this));
        EventBus.subscribe('join-chat', this.InitialMsg.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('send-msg', this.SendMessage.bind(this));
        EventBus.unsubscribe('join-chat', this.InitialMsg.bind(this));
    }

    SendMessage(data) {
        console.log(data);
        this.socket.send(data);
    }

    InitialMsg(data) {
        this.socket.send(data);
        this.username = JSON.parse(data).full_name;
        super.stop();
        super.execute(new SupportChatView({username: this.username}));
    }
}

export default new SupportChatController();
