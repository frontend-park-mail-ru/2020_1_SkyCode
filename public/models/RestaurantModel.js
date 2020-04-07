import Http from './Http.js';

class RestaurantModel {
    getRestaurant(id) {
        return Http.fetchGet({
            path: `/api/v1/restaurants/${id}`,
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }

    getProducts(id) {
        return Http.fetchGet({
            path: `/api/v1/restaurants/${id}/product`,
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }

    getRestaurants() {
        return Http.fetchGet({
            path: '/api/v1/restaurants',
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }

    addProduct(id, body) {
        return Http.fetchPost({
            path: `/api/v1/restaurants/${id}/product`,
            body,
            type: 'file',
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }

    addProductImage(id, body) {
        return Http.fetchPut({
            path: `/api/v1/products/${id}/image`,
            body,
            type: 'file',
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }

    addOrder(body) {
        return Http.fetchPost({
            path: '/api/v1/orders/checkout',
            body: JSON.stringify(body),
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }
}

export default new RestaurantModel();
