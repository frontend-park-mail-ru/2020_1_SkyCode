import header from '../../blocks/header/header.js';
import Block from '../../../Block.js';

class MainView extends Block {
    constructor({user} = {}) {
        super();

        this.addTemplateData({
            header: new header({user}),
        }, true);

        this.bind();
    }
}

export default MainView;