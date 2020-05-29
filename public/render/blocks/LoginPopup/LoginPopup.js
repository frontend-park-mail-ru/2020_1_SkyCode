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
        setTimeout(() => {
            this.domElement.style.opacity = '1';
            this.context.LoginField.focusOnPhoneInput();
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
            EventBus.broadcast(Events.logPopDisappear);
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
