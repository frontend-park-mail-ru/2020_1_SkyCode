import Component from '../../Component';
import SignupField from '../signupField/SignupField';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import temp from './SignupPopup.hbs';


export default class SignupPopup extends Component {
    constructor() {
        super('signup-popup');
        this.addContextData({
            SignupField: new SignupField(),
        });
        this.isStatic = false;
        this.template = temp;
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.escButPressed, this.disappear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.signupRequest, this.appear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.loginRequest, this.quiteDisappear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.successSignup, this.quiteDisappear.bind(this)),
        );
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
        this.disappear();
    }

    unbind() {
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = null;
        super.unbind();
    }

    appear({isStatic = false} = {}) {
        this.isStatic = isStatic;
        if (isStatic) this.becomeStatic();

        this.domElement.style.display = 'flex';
        setTimeout(() => {
            this.domElement.style.opacity = '1';
            this.context.SignupField.focusOnFNameInput();
        }, 100);
    }

    disappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.opacity = '0';

        setTimeout(() => {
            this.domElement.style.display = 'none';
            EventBus.broadcast(Events.signPopDisappear);
        }, 100);
    }


    quiteDisappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.opacity = '0';

        setTimeout(() => {
            this.domElement.style.display = 'none';
        }, 100);
    }

    becomeStatic() {
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = null;
    }

    becomeNotStatic() {
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };
    }
}
