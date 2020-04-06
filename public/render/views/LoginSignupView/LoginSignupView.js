import Component from '../../Component.js';
import LoginField from '../../blocks/loginField/LoginField.js';
import SignupField from '../../blocks/signupField/SignupField.js';
import Header from '../../blocks/header/Header.js';
import template from './LoginSignupView.hbs';

export default class LoginSignupView extends Component {
    constructor() {
        super('log');
        super.template = template;
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            LoginField: new LoginField({
                classes: 'login-signup__login',
            }),
            SignupField: new SignupField({
                classes: 'login-signup__signup',
            }),
        });
    }
}
