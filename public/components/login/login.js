import {Button} from '../general/button/button.js';
import {Input} from '../general/input/input.js';
import {Label} from '../general/label/label.js';
import {Title} from '../general/title/title.js';

export class Login {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const title = new Title('Log In', 'login__title');
        const usrLabel = new Label('Username', 'login__label');
        const usrInput = new Input('username', 'Username', 'text', 'login__input');
        const pswdLabel = new Label('Password', 'login__label');
        const pswdInput = new Input('password', 'Password', 'password', 'login__input');
        const buttonInput = new Button('Log In', 'login__button');

        const template = '<section class={{className}}>' +
           ' <form action={{action}} method="post">' +
            title.render() +  usrLabel.render() + usrInput.render() + pswdLabel.render() + pswdInput.render() + buttonInput.render() +
            ' </form>' +
            '</section>';

        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({className: 'login__form', action: '/'});

    }
}