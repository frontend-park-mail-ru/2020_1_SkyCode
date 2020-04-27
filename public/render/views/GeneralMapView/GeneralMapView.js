import Component from '../../Component.js';
import BaseView from '../BaseView/BaseView.js';
import temp from './GeneralMapView.hbs';
import MapView from '../MapView/MapView.js';

class GeneralMapView extends Component {
    constructor({}) {
        super('', {
            BaseView: new BaseView({
                MainArea: new MapView({}),
            }),
        });

        this.template = temp;
    }
}

export default GeneralMapView;
