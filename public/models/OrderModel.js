import Http from './Http.js';

class OrderModel {
    getOrders(page, count) {
        return Http.fetchGet({path: `/api/v1/orders?count=${count}&page=${page}`})
            .then((response) => response.json());
    }

    deleteOrder(id) {
        return Http.fetchDelete({path: `/api/v1/orders/${id}`})
            .then((response) => response.json());
    }
}

export default new OrderModel();
