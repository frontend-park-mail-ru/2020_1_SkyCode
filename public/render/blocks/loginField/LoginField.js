import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import Button from '../../elements/button/Button.js';

export default class LoginField extends Component {
    constructor({classes}) {
        super(classes, {
            identifierInput: new Input({
                classes: 'login-field__input',
                id: 'login-field__email-input',
                type: 'email',
                placeholder: 'your@email.fast or +7(9...'
            }),
            passwordInput: new Input({
                classes: 'login-field__input',
                id: 'login-field__password-input',
                type: 'password',
                placeholder: 'Spoone123',
            }),
            submitButton: new Button({
                classes: 'login-field__submit-button',
                id: 'login-field__submit-button',
                text: 'Login',
                callback: () => 0,
            }),
        });
    }
}
