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
        EventBus.subscribe(Events.escButPressed, this.disappear.bind(this));
        EventBus.subscribe(Events.signupRequest, this.appear.bind(this));
        EventBus.subscribe(Events.loginRequest, this.quiteDisappear.bind(this));
        EventBus.subscribe(Events.successSignup, this.quiteDisappear.bind(this));
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
        this.disappear();
    }

    unbind() {
        EventBus.unsubscribe(Events.escButPressed, this.disappear.bind(this));
        EventBus.unsubscribe(Events.signupRequest, this.appear.bind(this));
        EventBus.unsubscribe(Events.loginRequest, this.quiteDisappear.bind(this));
        EventBus.subscribe(Events.successSignup, this.quiteDisappear.bind(this));
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = null;
        super.unbind();
    }

    appear({isStatic = false} = {}) {
        this.isStatic = isStatic;
        if (isStatic) this.becomeStatic();

        this.domElement.style.display = 'flex';
        this.context.SignupField.focusOnFNameInput();
    }

    disappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.display = 'none';
        EventBus.broadcast(Events.signPopDisappear);
    }

    quiteDisappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.display = 'none';
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
