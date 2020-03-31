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
                placeholder: '+7(888)999-12-34'
            }),
            EmailInput: new Input({
                classes: 'profile-text-area__input',
                id: 'email-input',
                type: 'email',
                value: email,
                placeholder: 'new@email.com'
            }),
            PasswordInput: new Input({
                classes: 'profile-text-area__input',
                id: 'password-input',
                placeholder: 'current password'
            }),
            NewPasswordInput: new Input({
                classes: 'profile-text-area__input',
                id: 'new-password-input',
                placeholder: 'new password',
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
                classes: 'profile-text-area__submit-password',
                text: 'Save password',
            }),
        });
    }
}