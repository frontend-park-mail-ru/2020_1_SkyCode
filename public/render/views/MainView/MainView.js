import header from '../../blocks/header/header.js';
import actionBar from '../../blocks/actionBar/actionBar.js';
import categories from '../../blocks/categories/categories.js';
import Block from '../../Block.js';

class MainView extends Block {
    constructor({actionArr, categories: categoryData}) {
        super();

        this.addTemplateData({
            header: new header({
                classes: 'header'
            }),
            actionBar: new actionBar({
                classes: 'actions',
                actionArr,
            }),
            categories: new categories({
                classes: 'categories',
                categories: categoryData,
            })
        }, true);
    }
}

export default MainView;