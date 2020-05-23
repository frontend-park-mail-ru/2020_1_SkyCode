import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import Event from '../../../services/Events/Events';
import template from './LoginField.hbs';
import PhoneInput from '../../elements/phoneInput/PhoneInput';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import ErrorBlock from '../errorBlock/ErrorBlock';

export default class LoginField extends Component {
    constructor({classes = ''} = {}) {
        super(classes, {
            phoneInput: new CheckedInput({
                label: 'Телефон',
                Input: new PhoneInput({
                    classes: 'login-field__input',
                    id: 'login-field__phone-input',
                    isRequired: true,
                }),
            }),
            passwordInput: new CheckedInput({
                label: 'Пароль',
                Input: new Input({
                    classes: 'login-field__input',
                    id: 'login-field__password-input',
                    minlength: '7',
                    type: 'password',
                    isRequired: true,
                    placeholder: 'elevator3plant',
                }),
            }),
            generalErrorField: new ErrorBlock({
                id: 'login-general-error',
            }),
        });

        super.template = template;

        this.addContextData({
            submitButton: new NeonButton({
                classes: 'login-field__submit',
                text: 'Войти',
                callback: () => {
                    const isValid = this.context.phoneInput.isValid()
                    && this.context.passwordInput.isValid();

                    if (!isValid) {
                        return;
                    }

                    const data = {
                        phone: this.context.phoneInput.value(),
                        password: this.context.passwordInput.value(),
                    };
                    EventBus.broadcast(Event.login, data);
                },
            }),
            signupButton: new NeonButton({
                classes: 'login-field__goto-signup',
                text: 'Регистрация',
                callback: () => {
                    EventBus.broadcast(Event.signupRequest, {
                        isStatic: this.contextParent.isStatic,
                    });
                },
            }),
        });
    }

    focusOnPhoneInput() {
        this.context.phoneInput.focus();
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe('login-error', (message) => {
                this.context.generalErrorField.addMessage(message);
            }),
        );

        super.bind();
    }
}
