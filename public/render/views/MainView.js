import Block from '../block.js';
import header from '../components/blocks/header/header.js';

class MainView extends Block {

    constructor({user} = {}) {
        super([
            new header({user}),
            // Далее остальные блоки
        ],
        []);
    }
}

export default MainView;