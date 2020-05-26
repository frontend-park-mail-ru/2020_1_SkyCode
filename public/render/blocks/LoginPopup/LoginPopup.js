import Component from '../../Component';
import LoginField from '../loginField/LoginField';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import temp from './LoginPopup.hbs';


export default class LoginPopup extends Component {
    constructor() {
        super('login-popup');
        this.addContextData({
            LoginField: new LoginField(),
        });

        this.template = temp;
        this.isStatic = false;
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.escButPressed, () => {
                if (!this.isStatic) this.disappear.bind(this);
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.loginRequest, this.appear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.signupRequest, this.quiteDisappear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.successLogin, this.quiteDisappear.bind(this)),
        );
        document.getElementsByClassName('login-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
        this.disappear();
    }

    unbind() {
        document.getElementsByClassName('login-popup__hider')[0]
            .onclick = null;
        super.unbind();
    }

    appear({isStatic = false} = {}) {
        this.isStatic = isStatic;
        if (isStatic) this.becomeStatic();

        this.domElement.style.display = 'flex';
        this.context.LoginField.focusOnPhoneInput();
    }

    disappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.display = 'none';
        EventBus.broadcast(Events.logPopDisappear);
    }

    quiteDisappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.display = 'none';
    }

    becomeStatic() {
        document.getElementsByClassName('login-popup__hider')[0]
            .onclick = null;
    }

    becomeNotStatic() {
        document.getElementsByClassName('login-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };
    }
}
