import Component from '../../Component.js';
import template from './supportChat.hbs';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus';

export default class SupportChat extends Component {
    constructor({classes}) {
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
                    callback: () => {
                        const data = JSON.stringify({
                            message: this.context.Input.domElement.value,
                            chat_id: localStorage.getItem('chat_id'),
                            full_name: localStorage.getItem('full_name'),
                        });
                        EventBus.publish('send-message', data);
                    },
                },
            ),
        });

        super.template = template;
    }
}
