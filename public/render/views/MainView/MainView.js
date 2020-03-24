import header from '../../blocks/header/header.js';
import actionBar from '../../blocks/actionBar/actionBar.js';
import categoryBar from '../../blocks/categoryBar/categoryBar.js';
import Block from '../../Block.js';

class MainView extends Block {
    constructor({actionArr, categoryArr}) {
        super();

        this.addTemplateData({
            header: new header({
                classes: 'header'
            }),
            actionBar: new actionBar({
                classes: 'action-bar',
                actionArr,
            }),
            categoryBar: new categoryBar({
                classes: 'category-bar',
                categoryArr,
            })
        }, true);
    }
}

export default MainView;