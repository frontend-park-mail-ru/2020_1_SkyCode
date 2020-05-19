import Input from '../input/Input';
import MapModel from '../../../models/MapModel';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class GeoInput extends Input {
    constructor(idSuffix = '') {
        super({
            id: GeoInput.id(idSuffix),
            type: 'text',
            isRequired: true,
            placeholder: 'с точностью до дома',
        });

        this.id = GeoInput.id(idSuffix);
        this._isValid = false;
    }

    check() {
        const address = document.getElementById(this.id).value;
        MapModel
            .getCoordinates(address)
            .then((response) => {
                if (response.geopos) {
                    this.geopos = response.geopos;
                    sessionStorage.setItem('deliveryGeo', address);
                    sessionStorage.setItem('latitude', this.geopos.latitude);
                    sessionStorage.setItem('longitude', this.geopos.longitude);
                    this._isValid = true;
                    EventBus.publish(Events.geoConfirmationRequest);
                } else {
                    EventBus.publish(Events.stopGeoConfirmation);
                    document.getElementById(this.contextParent.errFieldId())
                        .innerText = 'с точностью до дома';
                }
            });
        return '';
    }

    static id(suffix) {
        return 'alone_geo-input' + suffix;
    }

    isValid() {
        return this._isValid;
    }

    unbind() {
        EventBus.publish(Events.stopGeoConfirmation);
        super.unbind();
    }
}
