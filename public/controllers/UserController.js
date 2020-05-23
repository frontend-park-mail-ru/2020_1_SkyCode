import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import SessionModel from '../models/SessionModel.js';
import BaseController from './BaseController.js';
import UserModel from '../models/UserModel.js';


class UserController extends BaseController {
    constructor(title = 'login-signup page') {
        super(title);
        this.profileId = 0;
        this.logined = false;
        this.updateUserInfo();
        setInterval(() => {
            this.updateUserInfo();
        }, 1000 * 60 * 5);
    }

    updateUserInfo() {
        return UserModel.getUser()
            .then((response) => {
                if (response.User) {
                    this.logined = true;
                    this.User = response.User;
                } else {
                    this.logined = false;
                }
            });
    }

    getUser() {
        if (!this.logined) return null;
        return this.User;
    }

    isLogined() {
        return this.logined;
    }

    startCatchEvents() {
        this.addUnbind(
            EventBus.subscribe(Event.signup, this.signupHandler.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Event.login, this.loginHandler.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Event.successLogout, this.successLogoutHandler.bind(this)),
        );
    }

    successLogoutHandler() {
        this.logined = false;
        this.User = null;
    }

    signupHandler(data) {
        data.phone = data.phone.replace(/[()-]/g, '');

        UserModel
            .createUser(data)
            .then((response) => {
                if (response.message) {
                    this.updateUserInfo();
                    EventBus.broadcast(Event.successSignup);
                }

                if (response.error) {
                    EventBus.broadcast(Event.signupError, response.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    loginHandler(data) {
        if (this.logined) {
            EventBus.broadcast(Event.successLogin, this.User.id);
            return;
        }

        data.phone = data.phone.replace(/[()-]/g, '');

        SessionModel
            .login(data)
            .then((response) => {
                if (response.User) {
                    this.profileId = response.User.id;
                    this.User = response.User;
                    this.logined = true;
                    EventBus.broadcast(Event.successLogin, response.User.id);
                }

                if (response.error) {
                    EventBus.broadcast(Event.loginError, response.error);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new UserController();
