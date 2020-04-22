import Component from '../../Component.js';
import template from '../chatList/chatList.hbs';
import ChatItem from '../chatItem/chatItem.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class ChatList extends Component {
    constructor({classes, chatArr}) {
        super(classes);

        super.template = template;

        const chatComponents = [];

        for (const chat of chatArr) {
            console.log("QQQ", chat);
            chatComponents.push(new ChatItem({
                classes: `chat-item-${chat.chat_id}`,
                id: chat.chat_id,
                user: chat.user_name,
                callback: () => {
                    EventBus.publish('set-page', {url: `/chat/${chat.chat_id}`});
                },
            }));
        }

        console.log(chatComponents);

        this.addContextData({ChatList: chatComponents});
    }
}
