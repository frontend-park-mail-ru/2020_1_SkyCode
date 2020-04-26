import Component from '../../Component.js';
import BaseView from '../BaseView/BaseView';
import RestaurantViewMainArea
    from '../../blocks/restaurantViewMainArea/RestaurantViewMainArea';
import temp from './RestaurantView.hbs';

class RestaurantView extends Component {
    constructor({restaurant, products, categoryArr}) {
        super('', {
            BaseView: new BaseView({
                MainArea: new RestaurantViewMainArea({
                    restaurant,
                    products,
                    categoryArr,
                }),
            }),
        });
        this.template = temp;
    }
}

export default RestaurantView;
