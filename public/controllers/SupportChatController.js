import BaseController from './BaseController.js';
import SupportChatView
    from '../render/views/SupportChatView/SupportChatView.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events';
import Message from '../render/blocks/message/message';
import ChatModel from '../models/ChatModel';
import UserController from './UserController';

class SupportChatController extends BaseController {
    constructor(title = 'support chat') {
        super(title);
        this.countuser = 0;
    }

    execute(matchData) {
        const chatId = matchData[0];

        if (chatId !== undefined) {
            this.socket = new WebSocket(`wss://skydelivery.site:8081/api/v1/chats/${chatId}/join`);
        } else {
            this.socket = new WebSocket('wss://skydelivery.site:8081/api/v1/chat');
        }

        this.socket.onopen = () => {
            const initMessage = JSON.stringify({
                user_name: UserController.User.firstName,
                chat_id: localStorage.getItem('chat_id'),
            });
            this.socket.send(initMessage);
        };

        this.socket.onmessage = (e) => {
            console.log('MESSAGE!' + e);
            const data = JSON.parse(e.data);
            console.log(data);

            if (data.user_name === '') data.user_name = UserController.User.firstName;
            localStorage.setItem('chat_id', data.chat_id);
            const domEl = document.getElementsByClassName('chat__messages')[0];
            if (data.message) {
                EventBus.publish(Event.newMessage, data);
                const el = new Message('msg', data.message, data.user_name);
                domEl.innerHTML += el;
            }
            if (data.joined) {
                this.countuser++;
                if (this.countuser === 2) {
                    EventBus.publish(Event.supportConnected, {});
                }
            }
            domEl.scrollTop = 99999;
        };

        super.execute(new SupportChatView({username: UserController.User.firstName}));
        ChatModel.getChatHistory(chatId !== undefined ? chatId : localStorage.getItem('chat_id'))
            .then((response) => {
                if (!Array.isArray(response)) return;

                const domEl = document.getElementsByClassName('chat__messages')[0];
                for (const msg of response) {
                    const el = new Message('msg', msg.message, msg.user_name);
                    domEl.innerHTML += el;
                }
                domEl.scrollTop = 99999;
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
