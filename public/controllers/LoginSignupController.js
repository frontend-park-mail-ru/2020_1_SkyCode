import LoginSignupView from '../render/views/LoginSignupView/LoginSignupView.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
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
                    EventBus.publish(Event.redirect, {url: '/me'});
                }
            })
            .catch((err) => {
                console.log(err);
                super.execute(new LoginSignupView());
            });
    }

    startCatchEvents() {
        EventBus.subscribe(Event.signup, this.signupHandler.bind(this));
        EventBus.subscribe(Event.login, this.loginHandler.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe(Event.signup, this.signupHandler.bind(this));
        EventBus.unsubscribe(Event.login, this.loginHandler.bind(this));
    }

    signupHandler(data) {
        data.phone = data.phone.replace(/[()-]/g, '');

        UserModel
            .createUser(data)
            .then((response) => {
                if (response.message) {
                    EventBus.publish(Event.setPage, {url: '/'});
                }

                if (response.error) {
                    EventBus.publish(Event.signupError, response.error);
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
                    EventBus.publish(Event.setPage, {url: '/'});
                    this.profileId = response.User.id;
                    EventBus.publish(Event.successLogin, response.User.id);
                }

                if (response.error) {
                    EventBus.publish(Event.loginError, response.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new LoginSignupController();
