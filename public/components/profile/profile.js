import {Title} from '../general/title/title.js';
import {Input} from '../general/input/input.js';
import {Button} from '../general/button/button.js';
import {Image} from '../general/image/image.js';

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
        const input = new Input('profilephoto', 'Change', 'file', 'profile__uploadphoto');
        const usrInput = new Input('username', `${this.user.email}`, 'text', 'profile__input');
        const fNameInput = new Input('firstName', `${this.user.firstName}`, 'text', 'profile__input');
        const lNameInput = new Input('lastName', `${this.user.lastName}`, 'text', 'profile__input');
        const pswd1Input = new Input('password1', '******', 'password', 'profile__input');
        const pswd2Input = new Input('password2', '******', 'password', 'profile__input');
        const buttonInput = new Button('Save', 'profile__button');

        const template = '<section class={{className}}>' +
            ' <form action={{action}}>' +
            title.render() + ava.render() + input.render() + usrInput.render() + fNameInput.render() +
            lNameInput.render() + pswd1Input.render() + pswd2Input.render() +
            buttonInput.render() +
            ' </form>' +
            '</section>';

        const compileTemplate = Handlebars.compile(template);
        return  compileTemplate({className: 'profile__form', action: '/'});
    }
}