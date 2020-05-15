import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import Event from '../../../services/Events/Events.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import template from './SignupField.hbs';
import PhoneInput from '../../elements/phoneInput/PhoneInput';
import CheckedInput from '../../elements/checkedInput/CheckedInput';

export default class SignupField extends Component {
    constructor({classes = ''} = {}) {
        super(classes, {
            fNameInput: new CheckedInput({
                label: 'Имя',
                Input: new Input({
                    classes: 'signup-field__input',
                    id: 'signup-field__fname-input',
                    type: 'text',
                    placeholder: 'Александр',
                    isRequired: true,
                    minlength: '4',
                }),
            }),
            lNameInput: new CheckedInput({
                label: 'Фамилия',
                Input: new Input({
                    classes: 'signup-field__input',
                    id: 'signup-field__lname-input',
                    type: 'text',
                    placeholder: 'Постников',
                    isRequired: true,
                    minlength: '4',
                }),
            }),
            phoneInput: new CheckedInput({
                label: 'Телефон',
                Input: new PhoneInput({
                    classes: 'signup-field__input',
                    id: 'signup-field__phone-input',
                    isRequired: true,
                }),
            }),
            passwordInput1: new CheckedInput({
                label: 'Пароль',
                Input: new Input({
                    classes: 'signup-field__input',
                    id: 'signup-field__password-input1',
                    type: 'password',
                    placeholder: 'elevator3plant',
                    isRequired: true,
                    minlength: '7',
                }),
            }),
            passwordInput2: new CheckedInput({
                label: 'Подтверждение',
                Input: new Input({
                    classes: 'signup-field__input',
                    id: 'signup-field__password-input2',
                    type: 'password',
                    placeholder: 'elevator3plant',
                    isRequired: true,
                }),
            }),
            generalErrorField: new ErrorBlock({
                id: 'signup-general-error',
            }),
        });

        super.template = template;

        this.addContextData({
            submitButton: new NeonButton({
                classes: 'signup-field__submit',
                text: 'Зарегистрироваться',
                callback: () => {
                    this.context.generalErrorField.clean();

                    const isValid = this.context.fNameInput.isValid()
                        && this.context.lNameInput.isValid()
                        && this.context.phoneInput.isValid()
                        && this.context.passwordInput1.isValid()
                        && this.context.passwordInput2.isValid();

                    if (!isValid) {
                        return;
                    }

                    if (this.context.passwordInput1.value()
                        !== this.context.passwordInput2.value()) {
                        this.context.generalErrorField.addMessage(
                            'Пароли должны совпадать',
                        );
                        return;
                    }

                    const data = {
                        firstName: this.context.fNameInput.value(),
                        lastName: this.context.lNameInput.value(),
                        phone: this.context.phoneInput.value(),
                        password: this.context.passwordInput1.value(),
                    };
                    EventBus.publish(Event.signup, data);
                },
            }),
            LoginButton: new NeonButton({
                classes: 'singup-field__goto-login',
                text: 'Вход',
                callback: () => {
                    EventBus.publish(Event.loginRequest);
                },
            }),
        });
    }

    bind() {
        EventBus.subscribe(Event.signupError, (message) => {
            this.context.generalErrorField.addMessage(message);
        });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(Event.signupError, (message) => {
            this.context.generalErrorField.addMessage(message);
        });

        super.unbind();
    }
}
