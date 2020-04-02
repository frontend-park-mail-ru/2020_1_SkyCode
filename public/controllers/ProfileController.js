import BaseController from './BaseController.js';
import ProfileView from '../render/views/ProfileView/ProfileView.js';
import Mocks from '../mocks.js';
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
        EventBus.subscribe('update-user', this.updateCb.bind(this));
        console.log('subscribe');
    }

    stopCatchEvents() {
        EventBus.unsubscribe('update-user', this.updateCb.bind(this));
    }

    updateCb(data) {
        console.log('cb');
        UserModel.updateUser(data).then(response => {
            EventBus.publish('set-page', {url: '/me'});
        })
    }
}


export default new ProfileController();
