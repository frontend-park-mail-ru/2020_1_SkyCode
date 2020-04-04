import Http from './Http.js';

class RestaurantModel {
    getRestaurant(id) {
        return Http.fetchGet({path: `/api/v1/restaurants/${id}`}).then(response => response.json());
    }

    getProducts(id) {
        return Http.fetchGet({path: `/api/v1/restaurants/${id}/product`}).then(response => response.json());
    }

    getRestaurants() {
        return Http.fetchGet({path: '/api/v1/restaurants/'}).then(response => response.json());
    }
}

export default new RestaurantModel();
