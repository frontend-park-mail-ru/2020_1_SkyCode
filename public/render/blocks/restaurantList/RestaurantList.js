import Component from '../../Component.js';
import Restaurant from '../restaurant/Restaurant.js';
import template from './RestaurantList.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class RestaurantList extends Component {
    constructor({classes, restaurantArr, catId = '-1'}) {
        super(classes);
        super.template = template;
        this.addContextData({
            restaurantComponents: this.formRestComponents(restaurantArr, catId),
        });
        this.restArr = restaurantArr;
        this.id = 'restaurant-list';
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.restCategorySelected, this.changeCategoryHandler.bind(this)),
        );
        super.bind();
    }

    changeCategoryHandler(catId) {
        this.addContextData({
            restaurantComponents: this.formRestComponents(this.restArr, catId),
        });
        this.domElement.outerHTML = this.toString();
    }


    filterRestCategories(restArr, catId) {
        if (catId === '-1') return restArr;
        return restArr.filter((rest) => rest.tagsIds.includes(catId));
    }

    formRestComponents(restArr, catId = '-1') {
        const filteredRestArr = this.filterRestCategories(restArr, catId);

        const restaurantComponents = [];
        for (const restaurant of filteredRestArr) {
            restaurantComponents.push(new Restaurant({
                classes: `restaurant-list__restaurant-${restaurant.id}`,
                name: restaurant.name,
                avgDeliveryTime: 30,
                rate: restaurant.rating,
                imageHref: `/images/${restaurant.image}`,
                href: `/restaurants/${restaurant.id}/products/1`,
            }));
        }

        return restaurantComponents;
    }
}
