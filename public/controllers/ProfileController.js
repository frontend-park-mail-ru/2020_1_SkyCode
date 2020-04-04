import BaseController from './BaseController.js';
import ProfileView from '../render/views/ProfileView/ProfileView.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/Events/EventBus.js';

class ProfileController extends BaseController {
    constructor(title = 'profile page') {
        super(title);
    }

    run() {
        UserModel.getUser().then(response =>  {
            super.run(new ProfileView({profile: response}));
        }).catch(err => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe('update-user', this.updateBioCb.bind(this));
        EventBus.subscribe('avatar-update', this.updateAvatarCb.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('update-user', this.updateBioCb.bind(this));
        EventBus.unsubscribe('avatar-update', this.updateAvatarCb.bind(this));
    }

    updateBioCb(data) {
        UserModel.updateUser(data).then(response => {
            EventBus.publish('set-page', {url: '/me'});
        });
    }

    updateAvatarCb(data) {
        console.log('AvaCb');
        UserModel.updateAvatar(data).then(response => {
            EventBus.publish('set-page', {url: '/me'});
        });
    }
}


export default new ProfileController();
