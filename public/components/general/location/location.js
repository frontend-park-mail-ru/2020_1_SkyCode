import {Label} from "../label/label.js";
import {Input} from "../input/input.js";

export class Location {
    constructor() {

    }

    render() {
        const label = new Label('Location', 'location__label').render();
        const input = new Input('location', 'Location', 'text', 'location__input').render();
        const template = '<div class="location">' + label + input + '</div>';
        const compileTemplate = Handlebars.compile(template);
        return compileTemplate({});
    }
}