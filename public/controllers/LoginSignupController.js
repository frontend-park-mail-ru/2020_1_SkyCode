import BaseController from './BaseController.js';
import LoginSignupView from '../render/views/LoginSignupView/LoginSignupView.js';
import EventBus from '../services/Events/EventBus.js';
import UserModel from '../models/UserModel.js';
import SessionModel from '../models/SessionModel.js';


class LoginSignupController extends BaseController {
    constructor(title = 'login-signup page') {
        super(title);
    }

    run({profile}) {
        if (profile !== undefined) {
            EventBus.publish('set-page', {url: '/'});
            return;
        }

        super.run(new LoginSignupView());
    }

    startCatchEvents() {
        EventBus.subscribe('signup', this.signupCb.bind(this));
        EventBus.subscribe('login', this.loginCb.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('signup', this.signupCb.bind(this));
        EventBus.unsubscribe('login', this.loginCb.bind(this));
    }

    signupCb(data) {
        UserModel.createUser(data).then(response => {
            if (response.message) {
                EventBus.publish('set-page', {url: '/'});
            }
        }).catch(err => console.log(err));
        console.log(data);
    }

    loginCb(data) {
        SessionModel.login(data).then(response => {
            if (response.User) {
                EventBus.publish('set-page', {url: '/'});
            }
        }).catch(err => console.log(err));
    }
}

export default new LoginSignupController();