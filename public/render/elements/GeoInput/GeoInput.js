import Input from '../input/Input';
import MapModel from '../../../models/MapModel';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class GeoInput extends Input {
    constructor() {
        super({
            id: 'alone_geo-input',
            type: 'text',
            isRequired: true,
            placeholder: 'с точностью до дома',
        });
    }

    bind() {
        super.bind();
    }

    check() {
        const address = document.getElementById('alone_geo-input').value;
        MapModel
            .getCoordinates(address)
            .then((response) => {
                if (response.geopos) {
                    this.geopos = response.geopos;
                    console.log(this.geopos);
                    sessionStorage.setItem('deliveryGeo', address);
                    sessionStorage.setItem('latitude', this.geopos.latitude);
                    sessionStorage.setItem('longitude', this.geopos.longitude);
                    EventBus.publish(Events.geoConfirmationRequest);
                } else {
                    EventBus.publish(Events.stopGeoConfirmation);
                    document.getElementById(this.contextParent.errFieldId())
                        .innerText = 'с точностью до дома';
                }
            });
        return '';
    }
}
