import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import Validation from '../../../services/InputValidation.js';
import template from './SignupField.hbs';
import PhoneInput from '../../elements/phoneInput/PhoneInput';

export default class SignupField extends Component {
    constructor({classes}) {
        super(classes, {
            fNameInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__fname-input',
                type: 'text',
                placeholder: 'first name',
                isRequired: true,
            }),
            lNameInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__lname-input',
                type: 'text',
                placeholder: 'last name',
                isRequired: true,
            }),
            phoneInput: new PhoneInput({
                classes: 'signup-field__input',
                id: 'signup-field__phone-input',
                isRequired: true,
            }),
            passwordInput1: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__password-input1',
                type: 'password',
                placeholder: 'GoodyGoody456',
                isRequired: true,
            }),
            passwordInput2: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__password-input2',
                type: 'password',
                placeholder: 'GoodyGoody456',
                isRequired: true,
            }),
            firstNameErrorField: new ErrorBlock({
                id: 'first-name-input-err',
            }),
            lastNameErrorField: new ErrorBlock({
                id: 'last-name-input-err',
            }),
            phoneErrorField: new ErrorBlock({
                id: 'phone-error',
            }),
            password1ErrorField: new ErrorBlock({
                id: 'password1-error',
            }),
            password2ErrorField: new ErrorBlock({
                id: 'password2-error',
            }),
            generalErrorField: new ErrorBlock({
                id: 'signup-general-error',
            }),
        });

        super.template = template;

        this.addContextData({
            submitButton: new NeonButton({
                classes: 'signup-field__submit',
                text: 'Sign Up',
                callback: () => {
                    this.context.generalErrorField.clean();

                    let validationFlag;
                    validationFlag = Validation.inputValidation(
                        this.context.fNameInput,
                        this.context.firstNameErrorField,
                    );

                    validationFlag = Validation.inputValidation(
                        this.context.lNameInput,
                        this.context.lastNameErrorField,
                    ) && validationFlag;

                    validationFlag = Validation.inputValidation(
                        this.context.phoneInput,
                        this.context.phoneErrorField,
                    ) && validationFlag;

                    validationFlag = Validation.inputValidation(
                        this.context.passwordInput1,
                        this.context.password1ErrorField,
                    ) && validationFlag;

                    validationFlag = Validation.inputValidation(
                        this.context.passwordInput2,
                        this.context.password2ErrorField,
                    ) && validationFlag;

                    if (this.context.passwordInput1.domElement.value
                        !== this.context.passwordInput2.domElement.value) {
                        validationFlag = false;
                        this.context.password1ErrorField.addMessage(
                            'Passwords must be equal',
                        );
                        this.context.password2ErrorField.addMessage(
                            'Passwords must be equal',
                        );
                    }

                    if (validationFlag === false) {
                        return;
                    }

                    const data = {
                        firstName: this.context.fNameInput.domElement.value,
                        lastName: this.context.lNameInput.domElement.value,
                        phone: this.context.phoneInput.domElement.value,
                        password: this.context.passwordInput1.domElement.value,
                    };
                    EventBus.publish('signup', data);
                },
            }),
        });
    }

    bind() {
        EventBus.subscribe('signup-error', (message) => {
            this.context.generalErrorField.addMessage(message);
        });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe('signup-error', (message) => {
            this.context.generalErrorField.addMessage(message);
        });

        super.unbind();
    }
}
