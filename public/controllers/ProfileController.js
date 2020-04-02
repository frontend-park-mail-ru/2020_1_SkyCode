import BaseController from './BaseController.js';
import ProfileView from '../render/views/ProfileView/ProfileView.js';
import Mocks from '../mocks.js';

class ProfileController extends BaseController {
    constructor(title = 'profile page') {
        super(title);
    }

    run({profile = Mocks.profile}) {
        super.run(new ProfileView({profile}));
    }
}

export default new ProfileController();
