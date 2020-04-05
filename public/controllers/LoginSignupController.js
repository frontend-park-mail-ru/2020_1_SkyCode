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
        UserModel
            .getUser()
            .then((answer) =>  {
                if (answer.error === 'Unauthorized') {
                    super.run(new LoginSignupView());
                } else {
                    EventBus.publish('redirect', {url: '/me'});
                }
            })
            .catch(err => {
                console.log(err);
                super.run(new LoginSignupView());
            });
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
        data.phone = data.phone.replace(/[()-]/g, '');

        UserModel
            .createUser(data)
            .then(response => {
                if (response.message) {
                    EventBus.publish('set-page', {url: '/'});
                }

                if (response.error) {
                    EventBus.publish('signup-error', response.error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    loginCb(data) {
        data.phone = data.phone.replace(/[()-]/g, '');

        SessionModel
            .login(data)
            .then(response => {
                if (response.User) {
                    EventBus.publish('set-page', {url: '/'});
                }

                if (response.error) {
                    EventBus.publish('login-error', response.error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default new LoginSignupController();