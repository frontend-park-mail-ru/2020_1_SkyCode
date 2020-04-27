import BaseController from './BaseController.js';
import MapView from '../render/views/MapView/MapView';
import GeneralMapView from '../render/views/GeneralMapView/GeneralMapView.js';
import Swal from 'sweetalert2';

class LocationController extends BaseController {
    constructor(title = 'адрес доставки') {
        super(title);
    }

    execute() {
        super.execute(new GeneralMapView({}));

    }
}


export default new LocationController();
