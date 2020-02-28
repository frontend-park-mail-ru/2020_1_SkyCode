import {Title} from '../general/title/title.js';
import {Input} from '../general/input/input.js';
import {Button} from '../general/button/button.js';
import {Image} from '../general/image/image.js';
import {Label} from "../general/label/label.js";

/**
 * Компонент редактирования профиля пользователя
 */
export class Profile {
    constructor(user) {
        this.user = user;
    }

    render() {
        const title = new Title(`Profile`, 'profile__title');
        const ava = new Image(`${this.user.profilePhoto}`, 'profile__photo');
        const avaErr = new Label('', )
        const input = new Input('profilephoto', 'Change', 'file', 'profile__uploadphoto');
        const usrInput = new Input('email', `${this.user.email}`, 'email',
            'profile__input', true, `${this.user.email}`);
        const emailErr = new Label('', 'email__err');

        const fNameInput = new Input('firstName', `${this.user.firstName}`,
            'text', 'profile__input', true, `${this.user.firstName}`);
        const fNameErr = new Label('', 'firstName__err');

        const lNameInput = new Input('lastName', `${this.user.lastName}`, 'text',
            'profile__input', true, `${this.user.lastName}`);
        const lNameErr = new Label('', 'lastName__err');

        const pswd1Input = new Input('password1', '******', 'password', 'profile__input');
        const pswd1InputErr = new Label('', 'password1__err');

        const pswd2Input = new Input('password2', '******', 'password', 'profile__input');
        const pswd2InputErr = new Label('', 'password2__err');

        const buttonInput = new Button('Save', 'profile__button');

        const template = '<section class={{className}}>' +
            ' <form action={{action}}>' +
            title.render() + ava.render() + input.render() + usrInput.render() + emailErr.render()
            + fNameInput.render() + fNameErr.render() +
            lNameInput.render() + lNameErr.render() +
            pswd1Input.render() + pswd1InputErr.render()
            + pswd2Input.render() + pswd2InputErr.render() +
            buttonInput.render() +
            ' </form>' +
            '</section>';

        const compileTemplate = Handlebars.compile(template);
        return  compileTemplate({className: 'profile__form', action: '/'});
    }
}