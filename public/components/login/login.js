import {Button} from '../general/button/button.js';
import {Input} from '../general/input/input.js';
import {Label} from '../general/label/label.js';
import {Title} from '../general/title/title.js';
import {ErrorComponent} from '../general/error/error.js';

/**
 * Компонент логина
 */
export class Login {
    render() {
        const title = new Title('Log In', 'login__title');

        const usrLabel = new Label('Username', 'login__label');
        const email = new Input('email', 'email', 'email', 'login__input', true);
        const emailErr = new ErrorComponent('email__err', 'error');

        const pswdLabel = new Label('Password', 'login__label');
        const pswdInput = new Input('password', 'Password', 'password', 'login__input', true);
        const pswdErr = new ErrorComponent( 'password__err', 'error');

        const buttonInput = new Button('Log In', 'login__button');
        const serverErr = new ErrorComponent('server_err', 'error');

        const template = '<section class={{className}}>' +
           ' <form action={{action}} method="post">' +
            title.render() +  usrLabel.render() + email.render() + emailErr.render() +
            pswdLabel.render() + pswdInput.render() + pswdErr.render() + buttonInput.render() +
            ' </form>' + serverErr.render() +
            '</section>';

        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({className: 'login__form', action: '/'});
    }
}
