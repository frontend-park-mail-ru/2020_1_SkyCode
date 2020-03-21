import Block from '../../../Block.js';
import href from '../../elements/href/href.js';
import searchBar from '../searchBar/searchBar.js';
import profileArea from '../profileArea/profileArea.js';
import button from '../../elements/button/button.js';

class header extends Block {
    constructor({ user } = {}) {
        super();
        this.addTemplateData({
            leftSideButton: new button({
                text: '.',
                callback: () => { console.log('left side button clicked'); },
                classes: ['header__hamburger-button'],
            }),

            logo: new href({
                text: 'Delivery',
                href: '/',
                classes: ['logo'],
            }),

            searchBar: new searchBar(),
            profileArea: new profileArea({ user }),
        }, true);
    }
}

export default header;