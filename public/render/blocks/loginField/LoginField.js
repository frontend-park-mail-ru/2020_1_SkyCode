import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import Validation from '../../../services/InputValidation.js';
import template from './LoginField.hbs';
import PhoneInput from '../../elements/phoneInput/PhoneInput';

export default class LoginField extends Component {
    constructor({classes}) {
        super(classes, {
            phoneInput: new PhoneInput({
                classes: 'login-field__input',
                id: 'login-field__email-input',
                isRequired: true,
            }),
            passwordInput: new Input({
                classes: 'login-field__input',
                id: 'login-field__password-input',
                type: 'password',
                placeholder: 'password',
                isRequired: true,
            }),
            phoneErrorField: new ErrorBlock({
                id: 'indent-input-err',
            }),
            passwordErrorField: new ErrorBlock({
                id: 'password-input-err',
            }),
            generalErrorField: new ErrorBlock({
                id: 'login-general-error',
            }),
        });

        super.template = template;

        this.addContextData({submitButton: new NeonButton({
            classes: 'login-field__submit',
            text: 'Log In',
            callback: () => {
                this.context.generalErrorField.clean();
                let validationFlag;

                validationFlag = Validation.inputValidation(
                    this.context.phoneInput,
                    this.context.phoneErrorField,
                );

                validationFlag = Validation.inputValidation(
                    this.context.passwordInput,
                    this.context.passwordErrorField,
                ) && validationFlag;

                if (validationFlag === false) {
                    return;
                }

                const data = {
                    phone: this.context.phoneInput.domElement.value,
                    password: this.context.passwordInput.domElement.value,
                };
                EventBus.publish('login', data);
            },
        })});
    }

    bind() {
        EventBus.subscribe('login-error', (message) => {
            this.context.generalErrorField.addMessage(message);
        });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe('login-error', (message) => {
            this.context.generalErrorField.addMessage(message);
        });

        super.unbind();
    }
}
