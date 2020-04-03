import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class SignupField extends Component {
    constructor({classes}) {
        super(classes, {
            fNameInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__fname-input',
                type: 'text',
                placeholder: 'first name',
            }),
            lNameInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__lname-input',
                type: 'text',
                placeholder: 'last name',
            }),
            phoneInput: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__phone-input',
                type: 'phone',
                placeholder: '+7(654)321-98-89',
            }),
            passwordInput1: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__password-input1',
                type: 'password',
                placeholder: 'GoodyGoody456',
            }),
            passwordInput2: new Input({
                classes: 'signup-field__input',
                id: 'signup-field__password-input2',
                type: 'password',
                placeholder: 'GoodyGoody456',
            })
        });

        this.addContextData({
            submitButton: new neonButton({
                classes: 'signup-field__submit',
                text: 'Sign Up',
                callback: () => {
                    const data = {
                        firstName: this.context.fNameInput.domElement.value,
                        lastName: this.context.lNameInput.domElement.value,
                        phone: this.context.phoneInput.domElement.value,
                        password: this.context.passwordInput1.domElement.value,
                    };
                    EventBus.publish('signup', data);
                }
            })
        });
    }
}
