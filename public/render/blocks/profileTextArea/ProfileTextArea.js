import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import Button from '../../elements/button/Button.js';

export default class ProfileTextArea extends Component {
    constructor({classes, phone, email}) {
        super(classes, {
            PhoneInput: new Input({
                classes: 'profile-text-area__input',
                id: 'phone-input',
                type: 'phone',
                value: phone,
            }),
            EmailInput: new Input({
                classes: 'profile-text-area__input',
                id: 'email-input',
                type: 'email',
                value: email,
            }),
            PasswordInput: new Input({
                classes: 'profile-text-area__input',
                id: 'password-input',
            }),
            AnoPasswordInput: new Input({
                classes: 'profile-text-area__input',
                id: 'ano-password-input',
            }),
            PhoneSubmitButton: new Button({
                classes: 'profile-text-area__submit',
                text: 'Save phone',
            }),
            EmailSubmitButton: new Button({
                classes: 'profile-text-area__submit',
                text: 'Save email',
            }),
            PasswordSubmitButton: new Button({
                classes: 'profile-text-area__submit',
                text: 'Save password',
            }),
        });
    }
}