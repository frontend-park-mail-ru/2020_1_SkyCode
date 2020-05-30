import Component from '../../Component.js';
import template from '../AdminChatListView/AdminChatListView.hbs';
import ChatList from '../../blocks/chatList/chatList.js';

export default class AdminChatListView extends Component {
    constructor({chatArray}) {
        super();
        this.addContextData({
            ChatList: new ChatList({
                classes: 'chat-list',
                chatArr: chatArray,
            }),
        });

        super.template = template;
    }
}
