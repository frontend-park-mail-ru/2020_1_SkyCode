import Component from '../../Component.js';
import LoginField from '../../blocks/loginField/LoginField.js';
import SignupField from '../../blocks/signupField/SignupField.js';
import Header from '../../blocks/header/Header.js';
import template from './LoginSignupView.hbs';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';

export default class LoginSignupView extends BaseView {
    constructor() {
        super({
            Main: new MainArea(),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
        });
    }
}

class MainArea extends Component {
    constructor() {
        super();
        super.template = template;
        this.addContextData({
            LoginField: new LoginField({
                classes: 'login-signup__login',
            }),
            SignupField: new SignupField({
                classes: 'login-signup__signup',
            }),
        });
    }
}
