import {LocationInput} from "./__input/location__input.js";
import {LocationLabel} from "./__label/location__label.js";

export class Location {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const location = document.createElement('div');
        location.classList.add('location');
        const label = new LocationLabel(location);
        label.render();
        const input = new LocationInput(location);
        input.render();
        this.parent.appendChild(location);
    }
}