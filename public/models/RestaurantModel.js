import Http from './Http.js';

class RestaurantModel {
    addRestaurant(body) {
        return Http.fetchPost({
            path: '/api/v1/restaurants',
            body,
            type: 'file',
        });
    }

    getRestaurant(id) {
        return Http.fetchGet({
            path: `/api/v1/restaurants/${id}`,
        });
    }

    getRestaurantReviews(id, page, count) {
        return Http.fetchGet({
            path: `/api/v1/restaurants/${id}/reviews?count=${count}&page=${page}`,
        });
    }

    addRestaurantReview(id, body) {
        return Http.fetchPost({
            path: `/api/v1/restaurants/${id}/reviews`,
            body,
        });
    }

    changeRestaurantReview(id, body) {
        return Http.fetchPut({
            path: `/api/v1/reviews/${id}`,
            body,
        });
    }

    getProducts(id, page, count) {
        return Http.fetchGet({
            path: `/api/v1/restaurants/${id}/product?page=${page}&count=${count}`,
        });
    }

    getRestaurants(page, count) {
        return Http.fetchGet({
            path: `/api/v1/restaurants?page=${page}&count=${count}`,
        });
    }

    getRestaurantsByAddress(page, count, address) {
        return Http.fetchGet({
            path: `/api/v1/restaurants_point?page=${page}&count=${count}&address=${address}`,
        });
    }

    addProduct(id, body) {
        return Http.fetchPost({
            path: `/api/v1/restaurants/${id}/product`,
            body,
            type: 'file',
        });
    }

    addProductImage(id, body) {
        return Http.fetchPut({
            path: `/api/v1/products/${id}/image`,
            body,
            type: 'file',
        });
    }

    addOrder(body) {
        return Http.fetchPost({
            path: '/api/v1/orders/checkout',
            body: JSON.stringify(body),
        });
    }

    addPoint(body, id) {
        return Http.fetchPost({
            path: `/api/v1/restaurants/${id}/points`,
            body: JSON.stringify(body),
        });
    }
}

export default new RestaurantModel();
