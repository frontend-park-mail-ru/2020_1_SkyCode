import Block from '../../../block.js';
import input from '../../elements/input/input.js';
import button from '../../elements/button/button.js';

class searchBar extends Block {
    constructor() {
        super([
            new input({
                type: 'text',
                placeholder: 'search',
                classes: ['search-bar__input'],
            }),
            new button({
                text: 'search',
                classes: ['search-bar__button'],
                callback: () => {console.log('search-bar__button clicked')},
            })
        ]);
    }
}

export default searchBar;