import Component from '../../Component.js';
import Href from '../../elements/href/Href.js';
import HamburgerButton from '../../elements/hamburgerButton/HamburgerButton.js';
import Input from '../../elements/input/Input.js';
import SearchField from '../searchField/SearchField.js';
import template from './Header.hbs';

export default class Header extends Component {
    constructor({classes = 'header'} = {}) {
        super();
        super.template = template;
        this.addContextData({
            HamburgerButton: new HamburgerButton({
                classes: 'header__hamburger-button',
                callback: () => {
                    console.log('hamburgerButton clicked');
                },
            }),

            Logo: new Href({
                text: 'Delivery',
                href: '/',
                classes: 'header__logo',
            }),

            SearchField: new SearchField({
                callback: () => {
                    console.log('searchFieldButton clicked');
                },
                classes: 'header__search-field',
            }),

            ProfileButton: new Input({
                type: 'image',
                src: '/static/profile.png',
                classes: 'header__profile-button',
            }),

            IconBar: new IconBar(),
        }, true);

        this.addClasses(classes);
    }
}
