import Component from '../../Component.js';
import Href from '../../elements/href/Href.js';
import HamburgerButton from '../../elements/hamburgerButton/HamburgerButton.js';
import Input from '../../elements/input/Input.js';
import SearchField from '../searchField/SearchField.js';

export default class Header extends Component {
    constructor({ classes = 'header' } = {}) {
        super();
        this.addContextData({
            hamburgerButton: new HamburgerButton({
                classes: 'header__hamburger-button',
                callback: () => { console.log('hamburgerButton clicked'); },
            }),

            logo: new Href({
                text: 'Delivery',
                href: '/',
                classes: 'header__logo',
            }),

            searchField: new SearchField({
                callback: () => { console.log('searchFieldButton clicked'); },
                classes: 'header__search-field',
            }),

            profileButton: new Input({
                type: 'image',
                src: '/static/profile.png',
                classes: 'header__profile-button'
            }),
        }, true);

        this.addClasses(classes);
    }
}
