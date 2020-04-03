import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class LoginField extends Component {
    constructor({classes}) {
        super(classes, {
            identifierInput: new Input({
                classes: 'login-field__input',
                id: 'login-field__email-input',
                type: 'text',
                placeholder: 'phone'
            }),
            passwordInput: new Input({
                classes: 'login-field__input',
                id: 'login-field__password-input',
                type: 'password',
                placeholder: 'password',
            }),

        });

        this.addContextData({submitButton: new neonButton({
            classes: 'login-field__submit',
            text: 'Log In',
            callback: () => {
                const data = {
                    phone: this.context.identifierInput.domElement.value,
                    password: this.context.passwordInput.domElement.value
                }
                EventBus.publish('login', data);
            }
        })});
    }
}
