import Block from '../../../Block.js';
import input from '../../elements/input/input.js';
import button from '../../elements/button/button.js';
import EventBus from '../../../../services/EventBus.js';

class searchBar extends Block {
    constructor() {
        super();
        this.children = {
            input: new input({
                type: 'text',
                placeholder: 'search',
                classes: ['search-bar__input'],
            }),

            button: new button({
                text: 'search',
                classes: ['search-bar__button'],
                callback: () => {
                    console.log('search-bar__button clicked');
                    EventBus.publish('search-bar-button-clicked')
                },
            }),
        };
    }

    bind() {
        super.bind();
        EventBus.subscribe('search-bar-button-clicked', async () => {
            console.log(`data "${document.getElementsByClassName('search-bar__input')[0].value}" searched`);

            EventBus.publish('search',
                {text: document.getElementsByClassName('search-bar__input')[0].value});
        })
    }
}

export default searchBar;