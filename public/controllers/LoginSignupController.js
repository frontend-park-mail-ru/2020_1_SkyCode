import BaseController from './BaseController.js';
import LoginSignupView from '../render/views/LoginSignupView/LoginSignupView.js';
import EventBus from '../services/Events/EventBus.js';


class LoginSignupController extends BaseController {
    constructor(title = 'login-signup page') {
        super(title);
    }

    show(url, {profile}) {
        if (profile !== undefined) {
            EventBus.publish('set-page', {url: '/'});
            return;
        }

        super.show(new LoginSignupView());
    }
}

export default new LoginSignupController();