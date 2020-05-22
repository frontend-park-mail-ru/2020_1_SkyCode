import Component from '../../Component';
import temp from './Point.hbs';

export default class Point extends Component {
    constructor({id, classes, color}) {
        super(classes, {
            color,
        }, id, temp);
    }
}

