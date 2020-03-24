import Block from '../../Block.js';
import href from '../../elements/href/href.js';
import hamburgerButton from '../../elements/hamburgerButton/hamburgerButton.js';
import input from '../../elements/input/input.js';
import searchField from '../searchField/searchField.js';

export default class header extends Block {
    constructor({ classes = 'header' } = {}) {
        super();
        this.addTemplateData({
            hamburgerButton: new hamburgerButton({
                classes: 'header__hamburger-button',
                callback: () => { console.log('hamburgerButton clicked'); },
            }),

            logo: new href({
                text: 'Delivery',
                href: '/',
                classes: 'header__logo',
            }),

            searchField: new searchField({
                callback: () => { console.log('searchFieldButton clicked'); },
                classes: 'header__search-field',
            }),

            profileButton: new input({
                type: 'image',
                src: '/static/profile.png',
                classes: 'header__profile-button'
            }),
        }, true);

        this.addClasses(classes);
    }
}
