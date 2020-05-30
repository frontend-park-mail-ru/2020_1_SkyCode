import Component from '../../Component.js';
import template from './SupportChatView.hbs';
import SupportChat from '../../blocks/supportChat/supportChat.js';

export default class SupportChatView extends Component {
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
