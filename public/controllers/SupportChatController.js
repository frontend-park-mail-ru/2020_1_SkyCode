import BaseController from './BaseController.js';
import SupportChatView
    from '../render/views/SupportChatView/SupportChatView.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events';
import Message from '../render/blocks/message/message';
import UserModel from '../models/UserModel';
import ChatModel from '../models/ChatModel';

class SupportChatController extends BaseController {
    constructor(title = 'support chat') {
        super(title);
        this.countuser = 0;
    }

    execute(matchData) {
        const chatId = matchData[0];

        UserModel.getUser()
            .then((response) => {
                if (response.error) {
                    EventBus.publish(Event.setPage, {url: '/login'});
                }
            })
            .catch((err) => console.log(err));

        if (chatId !== undefined) {
            this.socket = new WebSocket(`wss://skydelivery.site:8081/api/v1/chats/${chatId}/join`);
        }
        if (chatId === undefined) {
            this.socket = new WebSocket('wss://skydelivery.site:8081/api/v1/chat');
        }


        this.socket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            localStorage.setItem('chat_id', data.chat_id);
            if (data.message) {
                EventBus.publish(Event.newMessage, data);
                const el = new Message('msg', data.message, data.user_name);
                const domEl = document.getElementsByClassName('chat__messages')[0];
                domEl.innerHTML += el;

                domEl.scrollTop = domEl.scrollHeight;

                document.getElementsByClassName('chat__messages')[0].outerHTML = domEl.outerHTML;
            }
            if (data.joined) {
                this.countuser++;
                if (this.countuser === 2) {
                    EventBus.publish(Event.supportConnected, {});
                }
            }
        };

        UserModel.getUser()
            .then((response) => {
                if (response.User) {
                    this.username = response.User.firstName;
                    this.socket.send(JSON.stringify({
                        user_name: this.username,
                        chat_id: localStorage.getItem('chat_id'),
                    }));
                    super.execute(new SupportChatView({username: response.User.firstName}));
                    ChatModel.getChatHistory((chatId !== undefined) ? chatId : localStorage.getItem('chat_id'))
                        .then((response) => {
                            for (const msg of response) {
                                const el = new Message('msg', msg.message, msg.user_name);
                                const domEl = document.getElementsByClassName('chat__messages')[0];
                                domEl.innerHTML += el;
                            }
                            document.getElementsByClassName('chat__messages')[0].outerHTML = domEl.outerHTML;
                        })
                        .catch((err) => console.log(err));
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
