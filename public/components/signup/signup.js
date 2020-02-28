import {Button} from '../general/button/button.js';
import {Input} from '../general/input/input.js';
import {Label} from '../general/label/label.js';
import {Title} from '../general/title/title.js';

/**
 * Компонент регистрации пользователя
 */
export class Signup {
    render() {
        const title = new Title('Sign Up', 'signup__title');
        const emailLabel = new Label('Email', 'signup__label');
        const emailInput = new Input('email', 'Email', 'email',
            'signup__input', true);
        const emailErrLabel = new Label('', 'email__err err');

        const fNameLabel = new Label('First Name', 'signup__label');
        const fNameInput = new Input('firstName', 'First name',
            'text', 'signup__input', true);
        const fNameErrLabel = new Label('', 'firstName__err err');

        const lNameLabel = new Label('Last Name', 'signup__label');
        const lNameInput = new Input('lastName', 'Last name',
            'text', 'signup__input', true);
        const lNameErrLabel = new Label('', 'lastName__err err');

        const pswd1Label = new Label('Password', 'signup__label');
        const pswd1Input = new Input('password1', 'Password',
            'password', 'signup__input', true);
        const pswd1ErrLabel = new Label('', 'password1__err err');

        const pswd2Label = new Label('Password again', 'signup__label');
        const pswd2Input = new Input('password2', 'Password',
            'password', 'signup__input', true);
        const pswd2ErrLabel = new Label('', 'password2__err err');

        const buttonInput = new Button('Sign Up', 'signup__button');

        const template = '<section class={{className}}>' +
            ' <form action={{action}}>' +
            title.render() +
            emailLabel.render() +
            emailInput.render() +
            emailErrLabel.render() +
            fNameLabel.render() +
            fNameInput.render() +
            fNameErrLabel.render() +
            lNameLabel.render() +
            lNameInput.render() +
            lNameErrLabel.render() +
            pswd1Label.render() +
            pswd1Input.render() +
            pswd1ErrLabel.render() +
            pswd2Label.render() +
            pswd2Input.render() +
            pswd2ErrLabel.render() +
            buttonInput.render() +
            ' </form>' +
            '</section>';

        const compileTemplate = Handlebars.compile(template);
        return  compileTemplate({className: 'signup__form', action: '/'});

    }
}