import Block from '../../../block.js';
import href from '../../elements/href/href.js';
import searchBar from '../searchBar/searchBar.js';
import profileArea from '../profileArea/profileArea.js';
import button from '../../elements/button/button.js';

class header extends Block {
    constructor({ user } = {}) {
        let leftSideButton = new button({
            text: '.',
            callback: () => { console.log('left side button clicked'); },
            classes: ['left-side-button'],
        });

        let logo = new href({
            text: 'Delivery',
            href: '/',
            classes: ['logo'],
        });

        super([
            leftSideButton,
            logo,
            new searchBar(),
            new profileArea({ user }),
        ], []);
    }
}

export default header;