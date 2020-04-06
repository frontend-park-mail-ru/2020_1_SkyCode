// eslint-disable-next-line max-len
import LoginSignupView from '../render/views/LoginSignupView/LoginSignupView.js';
import EventBus from '../services/Events/EventBus.js';
import SessionModel from '../models/SessionModel.js';
import BaseController from './BaseController.js';
import UserModel from '../models/UserModel.js';


class LoginSignupController extends BaseController {
    constructor(title = 'login-signup page') {
        super(title);
        this.profileId = 0;
    }

    execute() {
        UserModel
            .getUser()
            .then((answer) =>  {
                if (answer.error === 'Unauthorized') {
                    super.execute(new LoginSignupView());
                } else {
                    EventBus.publish('redirect', {url: '/me'});
                }
            })
            .catch((err) => {
                console.log(err);
                super.execute(new LoginSignupView());
            });
    }

    startCatchEvents() {
        EventBus.subscribe('signup', this.signupHandler.bind(this));
        EventBus.subscribe('login', this.loginHandler.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('signup', this.signupHandler.bind(this));
        EventBus.unsubscribe('login', this.loginHandler.bind(this));
    }

    signupHandler(data) {
        data.phone = data.phone.replace(/[()-]/g, '');

        UserModel
            .createUser(data)
            .then((response) => {
                if (response.message) {
                    EventBus.publish('set-page', {url: '/'});
                }

                if (response.error) {
                    EventBus.publish('signup-error', response.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    loginHandler(data) {
        data.phone = data.phone.replace(/[()-]/g, '');

        SessionModel
            .login(data)
            .then((response) => {
                if (response.User) {
                    EventBus.publish('set-page', {url: '/'});
                    this.profileId = response.User.id;
                    EventBus.publish('success-login', response.User.id);
                }

                if (response.error) {
                    EventBus.publish('login-error', response.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new LoginSignupController();
