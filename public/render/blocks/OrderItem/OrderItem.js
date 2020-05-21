import Component from '../../Component';
import temp from './OrderItem.hbs';
import NeonButton from '../../elements/neonButton/NeonButton';
import OrderModel from '../../../models/OrderModel';
import Router from '../../../routing/Router';

export default class OrderItem extends Component {
    constructor({order}) {
        super('', {}, order.id, temp);
        this.prepareHtml(order);
    }

    updateStatus(status, orderId) {
        return () => {
            OrderModel.changeStatus(orderId, nextBackStatus(status))
                .then((response) => {
                    if (response.error) throw 'change stat err: ' + response.error;
                    Router.reload('Статус успешно изменён');
                })
                .catch((err) => console.log(err));
        };
    }

    prepareHtml(order) {
        const datetime = order.created_at;
        console.log(datetime);
        const time = datetime.slice(12, 19);
        const date = datetime.slice(0, 10);

        let button;
        let status;
        if (order.status === 'Accepted') {
            status = frontStatuses[0];
            button = new NeonButton({
                text: `Обновить статус до "${frontStatuses[1]}"`,
                id: 'order-item' + order.id + '__button',
                callback: this.updateStatus(status, order.id),
            });
        } else if (order.status === 'Delivering') {
            status = frontStatuses[1];
            button = new NeonButton({
                text: `Обновить статус до "${frontStatuses[1]}"`,
                id: 'order-item' + order.id + '__button',
                callback: this.updateStatus(status, order.id),
            });
        } else if (order.status === 'Done') {
            status = frontStatuses[2];
        } else if (order.status === 'Canceled') {
            status = frontStatuses[3];
        }
        this.addContextData({
            Button: button,
            status,
            date,
            time,
            order,
            products: order.products,
        });
    }

    bind() {
        const me = this.domElement;
        me.onclick = () => {
            Array.prototype.forEach.call(
                document.getElementsByClassName('restaurant-item'),
                (li) => {
                    li.className = 'restaurant-item';
                },
            );

            me.classList.add('restaurant-item__clicked');
        };

        super.bind();
    }

    unbind() {
        const me = this.domElement;
        me.onclick = null;
        super.unbind();
    }
}


const frontStatuses = [
    'Принят',
    'У курьера',
    'Доставлен',
    'Отменён',
];

const backStatuses = [
    'Accepted',
    'Delivering',
    'Done',
    'Canceled',
];


function frontStatus(backSt) {
    return frontStatuses[backStatuses.indexOf(backSt)];
}

function backStatus(frontSt) {
    return backStatuses[frontStatuses.indexOf(frontSt)];
}

function nextBackStatus(frontSt) {
    return backStatuses[frontStatuses.indexOf(frontSt) + 1];
}
