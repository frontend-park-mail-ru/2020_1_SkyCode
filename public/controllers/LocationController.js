import BaseController from './BaseController.js';
import MapView from '../render/views/MapView/MapView';

class LocationController extends BaseController {
    constructor(title = 'адрес доставки') {
        super(title);
    }

    execute() {
        super.execute(new MapView());
    }
}


export default new LocationController();
