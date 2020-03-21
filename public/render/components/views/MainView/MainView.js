import header from '../../blocks/header/header.js';
import Block from '../../../Block.js';

class MainView extends Block {
    constructor() {
        super();

        this.addTemplateData({
            header: new header({classes: 'header'}),
        }, true);
    }
}

export default MainView;