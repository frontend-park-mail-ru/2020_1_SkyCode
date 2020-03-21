import Block from '../../../Block.js';
import input from '../../elements/input/input.js';
import button from '../../elements/button/button.js';
import EventBus from '../../../../services/EventBus.js';

class searchBar extends Block {
    constructor() {
        super();
        this.addTemplateData({
            input: new input({
                type: 'text',
                placeholder: 'search',
                classes: 'search-bar__input',
            }),

            button: new button({
                text: 'search',
                classes: 'search-bar__button',

                callback: () => {

                    let data = {
                        value: document.getElementsByClassName('search-bar__input')[0].value,
                    };
                    console.log('data: ', data.value);
                    console.log('search-bar__button clicked');

                    EventBus.publish('search-bar-button-clicked', data);
                },
            }),
        }, true);
    }
}

export default searchBar;