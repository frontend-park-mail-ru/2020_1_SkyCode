import Component from '../../Component.js';
import neonButton from '../../elements/neonButton/neonButton.js';

export default class productCard extends Component {
	constructor({classes, imgSrc, productName, productDescription}) {
		super(classes, {imgSrc, productName, productDescription,
		button: new neonButton({classes: classes, href: '#', text: 'Add'})});
	}
}