import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import Button from '../../elements/button/Button.js';

export default class SignupField extends Component {
    constructor({classes}) {
        super(classes, {
            emailInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__email-input',
                type: 'email',
                placeholder: 'your@email.fast',
            }),
            phoneInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__phone-input',
                type: 'phone',
                placeholder: '+7(654)321-98-89',
            }),
            passwordInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__password-input',
                type: 'password',
                placeholder: 'GoodyGoody456',
            }),
            submitButton: new Button({
                classes: 'signup-field__submit-button',
                id: 'signup-field__submit-button',
                text: 'Signup',
                callback: () => 0,
            }),
        });
    }
}
