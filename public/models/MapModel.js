import Http from './Http.js';

class MapModel {
    getCoordinates(address) {
        return Http.fetchGet({
            path: `/api/v1/check_address?address=${address}`,
        }).then((response) => {
            const token = response.headers.get('X-Csrf-Token');
            if (token) {
                localStorage.setItem('token', token);
            }
            return response.json();
        });
    }
}

export default new MapModel();
