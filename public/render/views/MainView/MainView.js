import header from '../../blocks/header/header.js';
import actionBar from '../../blocks/actionBar/actionBar.js';
import categoryBar from '../../blocks/categoryBar/categoryBar.js';
import Component from '../../Component.js';
import order from '../../blocks/order/order.js';

class MainView extends Component {
    constructor({actionArr, categoryArr,
                profile, restaurant, basket}) {
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
            }),
            order: new order({
                classes: 'order',
                profile,
                restaurant,
                basket,
            })
        }, true);
    }
}

export default MainView;