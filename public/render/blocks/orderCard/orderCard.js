import Component from '../../Component.js';
import template from './orderCard.hbs';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus';

export default class OrderCard extends Component {
    constructor(classes, orderItem) {
        super();
        super.template = template;
        super.addContextData({
            restaurantName: orderItem.rest_name,
            time: orderItem.created_at,
            address: orderItem.address,
            products: orderItem.products,
            total: orderItem.price,
            status: orderItem.status,
        });

        if (orderItem.status === 'Accepted') {
            this.addContextData({
                button: new NeonButton({
                    classes: `delete-button-${orderItem.id}`,
                    text: 'Отменить',
                    callback: () => {
                        EventBus.publish('delete-order', {
                            id: orderItem.id,
                        });
                    },
                }),
            });
        }
    }
}
