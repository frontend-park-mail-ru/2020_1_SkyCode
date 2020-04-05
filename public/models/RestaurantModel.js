import Http from './Http.js';

class RestaurantModel {
    getRestaurant(id) {
        return Http.fetchGet({
            path: `/api/v1/restaurants/${id}`,
        }).then((response) => response.json());
    }

    getProducts(id) {
        return Http.fetchGet({
            path: `/api/v1/restaurants/${id}/product`,
        }).then((response) => response.json());
    }

    getRestaurants() {
        return Http.fetchGet({
            path: '/api/v1/restaurants',
        }).then((response) => response.json());
    }

    addProduct(id, body) {
        return Http.fetchPost({
            path: `/api/v1/restaurants/${id}/product`,
            body,
            type: 'file',
        }).then((response) => response.json());
    }

    addProductImage(id, body) {
        return Http.fetchPut({
            path: `/api/v1/products/${id}/image`,
            body,
            type: 'file',
        }).then((response) => response.json());
    }

    addOrder(body) {
        return Http.fetchPost({
            path: '/api/v1/orders/checkout',
            body: JSON.stringify(body),
        }).then((response) => response.json());
    }
}

export default new RestaurantModel();
