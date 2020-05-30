import Component from '../../Component.js';
import template from './supportChat.hbs';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus';
import UserController from '../../../controllers/UserController';
import Events from '../../../services/Events/Events';

export default class SupportChat extends Component {
    constructor({classes, username}) {
        super(classes, {
            Input: new Input({
                type: 'text',
                placeholder: 'Сообщение',
                classes: 'message_input',
            }),
        });

        this.addContextData({
            SendButton: new NeonButton({
                classes: 'send_button',
                text: 'Send',
                callback: this.submit.bind(this),
            }),
        });

        super.template = template;
        this.username = username;
    }

    submit() {
        if (document.getElementById('geo-popup').style.display !== 'none'
            || document.getElementById('signup-popup').style.display !== 'none'
            || document.getElementById('login-popup').style.display !== 'none')
            return;

        if (this.context.Input.domElement.value.trim().length === 0) return;

        const data = JSON.stringify({
            message: this.context.Input.domElement.value,
            chat_id: UserController.User.role === 'Support'
                ? Number(localStorage.getItem('chat_id'))
                : UserController.User.id,
            user_id: UserController.User.id,
            user_name: this.username,
        });
        this.context.Input.domElement.value = '';
        EventBus.broadcast('send-msg', data);
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.enterPressed, this.submit.bind(this)),
        );
        super.bind();
    }
}

