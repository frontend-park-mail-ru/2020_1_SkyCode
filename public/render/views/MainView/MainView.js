import header from '../../blocks/header/header.js';
import actions from '../../blocks/actions/actions.js';
import categories from '../../blocks/categories/categories.js';
import Block from '../../Block.js';

class MainView extends Block {
    constructor({actions: actionData, categories: categoryData}) {
        super();

        this.addTemplateData({
            header: new header({classes: 'header'}),
            actions: new actions({
                classes: 'actions',
                actions: actionData,
            }),
            categories: new categories({
                classes: 'categories',
                categories: categoryData,
            })
        }, true);
    }
}

export default MainView;