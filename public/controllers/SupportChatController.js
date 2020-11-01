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

        if (UserController.User.role === 'Support') {
            this.socket = new WebSocket(`ws://skydelivery.site/api/v1/chats/${chatId}/join`);
        } else {
            this.socket = new WebSocket('ws://skydelivery.site/api/v1/chat');
        }

        this.socket.onopen = (e) => {
            console.log('support chat opened');
        };

        this.socket.onmessage = (e) => {
            console.log('MESSAGE!' + e.data);
            const data = JSON.parse(e.data);

            localStorage.setItem('chat_id', data.chat_id);
            const domEl = document.getElementsByClassName('chat__messages')[0];
            if (data.message) {
                EventBus.broadcast(Event.newMessage, data);
                const el = new Message('msg', data.message, data.user_name);
                domEl.innerHTML += el;
            }
            if (data.joined) {
                this.countuser++;
                if (this.countuser === 2) {
                    EventBus.broadcast(Event.supportConnected, {});
                }
            }
            domEl.scrollTop = 99999;
        };

        super.execute(new SupportChatView({username: UserController.User.firstName}));
        setTimeout(() => {
            ChatModel.getChatHistory(UserController.User.role === 'Support' ? chatId : String(UserController.User.id))
                .then((response) => {
                    if (!Array.isArray(response)) return;
                    const domEl = document.getElementsByClassName('chat__messages')[0];
                    for (const msg of response) {
                        const el = new Message('msg', msg.message, msg.user_name);
                        domEl.innerHTML = el + domEl.innerHTML;
                    }
                    domEl.scrollTop = 99999;
                })
                .catch((err) => console.log(err));
        }, 100);
    }

    startCatchEvents() {
        this.addUnbind(
            EventBus.subscribe('send-msg', this.SendMessage.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe('join-chat', this.InitialMsg.bind(this)),
        );
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
