import BaseController from './BaseController.js';
import ProfileView from '../render/views/ProfileView/ProfileView.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import SessionModel from '../models/SessionModel.js';
import UserController from './UserController';

class ProfileController extends BaseController {
    constructor(title = 'profile page') {
        super(title);
    }

    execute() {
        super.execute(new ProfileView({profile: UserController.User}));
    }

    startCatchEvents() {
        EventBus.subscribe(Event.updateUser, this.updateBioHandler.bind(this));
        EventBus.subscribe(Event.logout, this.logoutHandler.bind(this));
        EventBus.subscribe(
            Event.avatarUpdate,
            this.updateAvatarHandler.bind(this),
        );
    }

    stopCatchEvents() {
        EventBus.unsubscribe(Event.updateUser, this.updateBioHandler.bind(this));
        EventBus.unsubscribe(Event.logout, this.logoutHandler.bind(this));
        EventBus.unsubscribe(
            Event.avatarUpdate,
            this.updateAvatarHandler.bind(this),
        );
    }

    logoutHandler() {
        SessionModel.logout().then((response) => {
            if (response.error) {
                EventBus.publish(Event.logoutError, response.error);
            } else {
                EventBus.publish(Event.successLogout);
                EventBus.publish(Event.setPage, {url: '/'});
            }
        })
            .catch((err) => {
                EventBus.publish(Event.logoutError, 'Bad connection');
                console.log(err);
            });
    }

    updateBioHandler(data) {
        UserModel
            .updateUser(data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish(Event.updateBioError, response.error);
                } else {
                    sessionStorage.message = 'Данные обновлены';
                    EventBus.publish(Event.setPage, {url: '/me'});
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish(Event.updateBioError, 'Bad connection');
            });
    }

    updateAvatarHandler(data) {
        UserModel
            .updateAvatar(data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish(Event.updateAvatarError, response.error);
                } else {
                    setTimeout(() => {
                        EventBus.publish(Event.setPage, {url: '/me'});
                    }, 300);
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish(Event.updateAvatarError, 'Bad connection');
            });
    }
}

export default new ProfileController();
