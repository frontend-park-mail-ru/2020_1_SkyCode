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
                EventBus.publish('updateUser', response);
                MainView.render();
            }).catch(error => alert(error));

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
