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
        this.addUnbind(
            EventBus.subscribe(
                Event.updateUser,
                this.updateBioHandler.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Event.logout,
                this.logoutHandler.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Event.avatarUpdate,
                this.updateAvatarHandler.bind(this),
            ),
        );
    }

    logoutHandler() {
        SessionModel.logout()
            .then((response) => {
                if (response.error) {
                    EventBus.broadcast(Event.logoutError, response.error);
                } else {
                    EventBus.broadcast(Event.successLogout);
                    EventBus.broadcast(Event.setPage, {url: '/'});
                }
            })
            .catch((err) => {
                EventBus.broadcast(Event.logoutError, 'Bad connection');
                console.log(err);
            });
    }

    updateBioHandler(data) {
        UserModel
            .updateUser(data)
            .then((response) => {
                if (response.error) {
                    EventBus.broadcast(Event.updateBioError, response.error);
                } else {
                    sessionStorage.message = 'Данные обновлены';
                    EventBus.broadcast(Event.setPage, {url: '/me'});
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.broadcast(Event.updateBioError, 'Bad connection');
            });
    }

    updateAvatarHandler(data) {
        UserModel
            .updateAvatar(data)
            .then((response) => {
                if (response.error) {
                    EventBus.broadcast(Event.updateAvatarError, response.error);
                } else {
                    UserController
                        .updateUserInfo()
                        .then(() => {
                            EventBus.broadcast(Event.setPage, {url: '/me'});
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.broadcast(Event.updateAvatarError, 'Bad connection');
            });
    }
}

export default new ProfileController();
