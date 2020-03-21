import header from '../../blocks/header/header.js';
import Block from '../../../Block.js';

class MainView extends Block {
    constructor({user} = {}) {
        super();

        this.templateData = {
            header: new header({user}),
        };

        this.bind();
    }
}

export default MainView;