import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './SupportChatView.hbs';
import SupportChat from '../../blocks/supportChat/supportChat.js';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';
import BaseView from '../BaseView/BaseView';


export default class SupportChatView extends BaseView {
    constructor({username}) {
        super({
            Main: new MainArea({username}),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor({username}) {
        super();
        this.addContextData({
            SupportChat: new SupportChat({
                classes: 'support-chat',
                username,
            }),
        });

        super.template = template;
    }
}
