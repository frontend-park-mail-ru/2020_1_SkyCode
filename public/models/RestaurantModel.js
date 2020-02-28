import Http from './Http.js';

/**
 * Модель ресторана, реализует реализует запросы к серверу за данными ресторана
 */
class RestaurantModel {
	getRestaurant(id) {
		return Http.fetchGet({path: `/restaurants/${id}`}).then(response => response.json());
	}
}

export default new RestaurantModel();
