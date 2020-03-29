import Component from '../../Component.js';
import Button from '../../elements/button/Button.js';


export default class SelectTimeButton extends Component {
    constructor({classes, imageHref, text, callback}) {
        super(classes, {
            textButton: new Button({
                classes: 'select-time-button__text-button',
                text,
                callback,
            }),
            imageButton: new Button({
                classes: 'select-time-button__image-button',
                callback,
            })
        });
    }
}