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
        this.template = temp;
    }

    bind() {
        EventBus.subscribe(Events.signupRequest, this.appear.bind(this));
        EventBus.subscribe(Events.loginRequest, this.disappear.bind(this));
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
        this.disappear();
    }

    unbind() {
        EventBus.unsubscribe(Events.signupRequest, this.appear.bind(this));
        EventBus.unsubscribe(Events.loginRequest, this.disappear.bind(this));
        document.getElementsByClassName('signup-popup__hider')[0]
            .onclick = null;
        super.unbind();
    }

    appear() {
        this.domElement.style.display = 'flex';
    }

    disappear() {
        this.domElement.style.display = 'none';
    }
}
