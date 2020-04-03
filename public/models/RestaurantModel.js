import Http from './Http.js';

class RestaurantModel {
	getRestaurant(id) {
		return Http.fetchGet({path: `/restaurants/${id}`}).then(response => response.json());
	}
}

export default new RestaurantModel();
