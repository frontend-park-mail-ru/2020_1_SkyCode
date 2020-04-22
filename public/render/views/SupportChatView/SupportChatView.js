import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './SupportChatView.hbs';
import SupportChat from '../../blocks/supportChat/supportChat.js';

export default class SupportChatView extends Component {
    constructor({username}) {
        super();
        console.log(username);
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            SupportChat: new SupportChat({
                classes: 'support-chat',
                username: username,
            }),
        });

        super.template = template;
    }
}
