import Component from '../../Component.js';
import template from '../AdminChatListView/AdminChatListView.hbs';
import ChatList from '../../blocks/chatList/chatList.js';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';

export default class AdminChatListView extends BaseView {
    constructor({chatArray}) {
        super({
            Main: new MainArea({
                chatArray,
            }),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
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
