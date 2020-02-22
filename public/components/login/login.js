import {LoginButton} from "./__button/login__button.js";
import {LoginTitle} from "./__title/login__title.js";
import {LoginInputPassword, LoginInputUsername} from "./__input/login__input.js";
import {LoginLabelPassword, LoginLabelUsername} from "./__label/login__label.js";

export class Login {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const login = document.createElement('section');
        login.classList.add('login');

        const form = document.createElement('form');
        form.classList.add('login__form');
        form.action = '/login';

        const title = new LoginTitle(form);
        const labelUsername = new LoginLabelUsername(form);
        const inputUsername = new LoginInputUsername(form);
        const labelPassword = new LoginLabelPassword(form);
        const inputPassword = new LoginInputPassword(form);
        const button = new LoginButton(form);

        title.render();
        labelUsername.render();
        inputUsername.render();
        labelPassword.render();
        inputPassword.render();
        button.render();

        login.appendChild(form);

        this.parent.appendChild(login);
    }
}