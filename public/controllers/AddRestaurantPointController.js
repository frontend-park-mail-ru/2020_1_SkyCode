import BaseController from './BaseController.js';
import AddRestaurantPointView
    from '../render/views/AddRestaurantPointView/AddRestaurantPointView.js';
import RestaurantModel from '../models/RestaurantModel.js';
import EventBus from '../services/Events/EventBus.js';
import Swal from 'sweetalert2';

class AddRestaurantPointController extends BaseController {
    constructor(title = 'Админка') {
        super(title);
    }

    execute(matchData) {
        this.restId = matchData[0];
        RestaurantModel.getRestaurant(this.restId)
            .then((response) => {
                super.execute(new AddRestaurantPointView({restaurant: response}));
                ymaps.ready(init);

                function init() {
                    const suggestView = new ymaps.SuggestView('suggest');
                }
            })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe('add-restaurant-point', this.AddPoint.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('add-restaurant-point', this.AddPoint.bind(this));
    }

    AddPoint(data) {
        console.log('POINT ADDED');
        RestaurantModel.addPoint(data, this.restId)
            .then((response) => {
                if (response.message) {
                    EventBus.publish('set-page', {url: `/admin/restaurants/${this.restId}`});
                }
                if (response.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ошибка',
                        text: 'Попробуйте ввести более точный адрес.',
                    });
                }
            })
            .catch((err) => console.log(err));
    }
}

export default new AddRestaurantPointController();
