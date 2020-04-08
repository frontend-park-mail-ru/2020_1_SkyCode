import BaseController from './BaseController.js';
import ProfileView from '../render/views/ProfileView/ProfileView.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/Events/EventBus.js';
import SessionModel from '../models/SessionModel.js';

class ProfileController extends BaseController {
    constructor(title = 'profile page') {
        super(title);
    }

    execute() {
        UserModel
            .getUser()
            .then((response) => {
                if (response.error === 'Unauthorized') {
                    EventBus.publish('redirect', {url: '/login'});
                } else {
                    super.execute(new ProfileView({profile: response}));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    startCatchEvents() {
        this.subscribe('update-user', this.updateBioHandler.bind(this));
        this.subscribe('log-out', this.logoutHandler.bind(this));
        this.subscribe(
            'avatar-update',
            this.updateAvatarHandler.bind(this),
        );
    }

    logoutHandler() {
        console.log('qwer');
        SessionModel.logout().then((response) => {
            if (response.error) {
                EventBus.publish('logout-error', response.error);
            } else {
                EventBus.publish('set-page', {url: '/login'});
            }
        })
            .catch((err) => {
                EventBus.publish('logout-error', 'Bad connection');
                console.log(err);
            });
    }

    updateBioHandler(data) {
        UserModel
            .updateUser(data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish('update-bio-error', response.error);
                } else {
                    EventBus.publish('set-page', {url: '/me'});
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish('update-bio-error', 'Bad connection');
            });
    }

    updateAvatarHandler(data) {
        UserModel
            .updateAvatar(data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish('update-avatar-error', response.error);
                } else {
                    EventBus.publish('set-page', {url: '/me'});
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish('update-avatar-error', 'Bad connection');
            });
    }
}


export default new ProfileController();
