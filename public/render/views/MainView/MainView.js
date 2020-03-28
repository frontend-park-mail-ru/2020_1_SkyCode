import Header from '../../blocks/header/Header.js';
import ActionBar from '../../blocks/actionBar/ActionBar.js';
import CategoryBar from '../../blocks/categoryBar/CategoryBar.js';
import Component from '../../Component.js';
import Order from '../../blocks/order/Order.js';

class MainView extends Component {
    constructor({actionArr, categoryArr,
                profile, products}) {
        super();

        this.addContextData({
            header: new Header({
                classes: 'header'
            }),
            actionBar: new ActionBar({
                classes: 'action-bar',
                actionArr,
            }),
            categoryBar: new CategoryBar({
                classes: 'category-bar',
                categoryArr,
            }),
            order: new Order({
                classes: 'order',
                profile,
                products,
            }),
        }, true);
    }
}

export default MainView;