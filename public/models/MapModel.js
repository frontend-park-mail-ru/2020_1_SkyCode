import Http from './Http.js';

class MapModel {
    getCoordinates(address) {
        return Http.fetchGet({
            path: `/api/v1/check_address?address=${address}`,
        });
    }
}

export default new MapModel();
