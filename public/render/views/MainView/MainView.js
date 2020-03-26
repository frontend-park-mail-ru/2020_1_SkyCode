import Header from '../../blocks/header/Header.js';
import ActionBar from '../../blocks/actionBar/ActionBar.js';
import CategoryBar from '../../blocks/categoryBar/CategoryBar.js';
import Component from '../../Component.js';
import Order from '../../blocks/order/Order.js';

class MainView extends Component {
    constructor({actionArr, categoryArr,
                profile, restaurant, basket}) {
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
                restaurant,
                basket,
            })
        }, true);
    }
}

export default MainView;