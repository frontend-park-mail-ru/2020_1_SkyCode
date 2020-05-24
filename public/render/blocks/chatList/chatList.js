import Component from '../../Component.js';
import template from '../chatList/chatList.hbs';
import ChatItem from '../chatItem/chatItem.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class ChatList extends Component {
    constructor({classes, chatArr}) {
        super(classes);

        super.template = template;

        if (!chatArr) chatArr = [];
        const chatComponents = [];

        for (const chat of chatArr) {
            chatComponents.push(new ChatItem({
                classes: `chat-item-${chat.chat_id}`,
                id: chat.chat_id,
                user: chat.user_name,
                callback: () => {
                    EventBus.broadcast('set-page', {url: `/admin/chats/${chat.chat_id}`});
                },
            }));
        }

        this.addContextData({ChatList: chatComponents});
    }
}
