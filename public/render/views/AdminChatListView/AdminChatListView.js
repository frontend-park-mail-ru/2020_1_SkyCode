import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from '../AdminChatListView/AdminChatListView.hbs';
import ChatList from '../../blocks/chatList/chatList.js';

export default class AdminChatListView extends Component {
    constructor({chatArray}) {
        console.log("!", chatArray);
        super();
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            ChatList: new ChatList({
                classes: 'chat-list',
                chatArr: chatArray,
            }),
        });

        super.template = template;
    }
}
