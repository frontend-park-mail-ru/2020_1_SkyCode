import Header from '../../components/header/header.js';
import {Signup} from '../../components/signup/signup.js';
import MainView from '../../views/MainView/mainView.js'
import LoginView from '../LoginView/loginView.js';
import UserModel from '../../models/UserModel.js';
import EventBus from '../../services/EventBus.js';
import Validation from "../../services/InputValidation.js";

class SignupView {
    constructor(parent = document.getElementById('application')) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.innerHTML += Header.getInstance().render();
        this.parent.innerHTML += new Signup().render();

        const button = document.getElementsByClassName('signup__button')[0];
        button.addEventListener('click', function (evt) {
            evt.preventDefault();

            if (!Validation.validationCheck()) {
                console.log('form is invalid');
                return;
            }

            if (document.getElementsByName('password1')[0].value !==
                document.getElementsByName('password2')[0].value) {
                console.log('form is invalid');
                Validation.setError('server_err', 'Passwords are different');
                return;
            }

            const email = document.getElementsByName('email')[0].value;
            const firstName = document.getElementsByName('firstName')[0].value;
            const lastName = document.getElementsByName('lastName')[0].value;
            const password = document.getElementsByName('password1')[0].value;

            const req = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            };

            UserModel.createUser(req).then(response => {
                if (response.error) {
                    Validation.setError('server_err', response.error);
                    return;
                }

                Validation.setError('server_err', '');
                EventBus.publish('updateUser', response);
                MainView.render();
            }).catch(error => {
                Validation.setError('server_error', error.error)});
        });

        document.querySelector('.login').addEventListener('click', (evt) => {
            evt.preventDefault();
            LoginView.render();
        });

        document.querySelector('.signup').addEventListener('click', (evt) => {
            evt.preventDefault();
        });

        document.querySelector('.main__logo').addEventListener('click', (evt) => {
            evt.preventDefault();
            MainView.render();
        });
    }
}

export default new SignupView();
