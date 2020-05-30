import Http from './Http.js';

class OrderModel {
    getUserOrders(page, count) {
        return Http.fetchGet({path: `/api/v1/orders?count=${count}&page=${page}`});
    }

    deleteOrder(id) {
        return Http.fetchDelete({path: `/api/v1/orders/${id}`});
    }

    getRestOrders(id, page = 1, count = 50) {
        return Http.fetchGet({path: `/api/v1/restaurants/${id}/orders?count=${count}&page=${page}`});
    }

    changeStatus(id, status) {
        return Http.fetchPost({
            path: `/api/v1/orders/${id}/status?status=${status}`,
        });
    }
}

export default new OrderModel();
