import {Button} from '../general/button/button.js';
import {Input} from '../general/input/input.js';
import {Label} from '../general/label/label.js';
import {Title} from '../general/title/title.js';

export class Signup {
    constructor() {

    }

    render() {
        const title = new Title('Sign Up', 'signup__title');
        const usrLabel = new Label('Email', 'signup__label');
        const usrInput = new Input('email', 'Email', 'text', 'signup__input');
        const fNameLabel = new Label('First Name', 'signup__label');
        const fNameInput = new Input('firstName', 'First name', 'text', 'signup__input');
        const lNameLabel = new Label('Last Name', 'signup__label');
        const lNameInput = new Input('lastName', 'Last name', 'text', 'signup__input');
        const pswd1Label = new Label('Password', 'signup__label');
        const pswd1Input = new Input('password1', 'Password', 'password', 'signup__input');
        const pswd2Label = new Label('Password again', 'signup__label');
        const pswd2Input = new Input('password2', 'Password', 'password', 'signup__input');
        const buttonInput = new Button('Sign Up', 'signup__button');

        const template = '<section class={{className}}>' +
            ' <form action={{action}}>' +
            title.render() +  usrLabel.render() + usrInput.render() + fNameLabel.render() + fNameInput.render() + lNameLabel.render() +
            lNameInput.render() + pswd1Label.render() + pswd1Input.render() + pswd2Label.render() + pswd2Input.render() +
            buttonInput.render() +
            ' </form>' +
            '</section>';

        const compileTemplate = Handlebars.compile(template);
        return  compileTemplate({className: 'signup__form', action: '/'});

    }
}