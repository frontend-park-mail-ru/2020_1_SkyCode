import Component from '../../Component.js';
import template from './addRestaurantPoint.hbs';
import NeonButton from '../../elements/neonButton/NeonButton';
import EventBus from '../../../services/Events/EventBus.js';

export default class AddRestaurantPoint extends Component {
    constructor({classes, name}) {
        super(classes, {
            RestaurantName: name,
        });

        super.template = template;

        this.addContextData({
            SubmitButton: new NeonButton({
                classes: 'add-rest-point-btn',
                text: 'Добавить',
                callback: () => {
                    const data = {
                        radius: parseFloat('5'),
                        address: document.getElementById('suggest').value,
                    };
                    EventBus.publish('add-restaurant-point', data);
                },
            }),
        });
    }
}

