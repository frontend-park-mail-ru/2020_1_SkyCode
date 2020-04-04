import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class AddProductByRestaurant extends Component {
	constructor({classes}) {
		super(classes, {
			nameInput: new Input({
				classes: 'add-product-by-restaurant__input',
				id: 'add-product-by-restaurant__name-input',
				type: 'text',
				placeholder: 'Name',
			}),
			costInput: new Input({
				classes: 'add-product-by-restaurant__input',
				id: 'add-product-by-restaurant__cost-input',
				type: 'text',
				placeholder: 'Price',
			}),
			Image: new Input({
				classes: 'add-product-by-restaurant__image-input',
				id: 'add-product-by-restaurant__image-input',
				type: 'file',
				value: 'xxx',
			}),

		});

		this.addContextData({
			submitButton: new neonButton({
				classes: 'add-product-by-restaurant__submit',
				text: 'Add',
				callback: () => {
					const data = {
						name: this.context.nameInput.domElement.value,
						price: parseFloat(this.context.costInput.domElement.value),
					};
					EventBus.publish('add-product-by-restaurant', data);
				}
			})
		});
	}

	bind() {
		this.context.Image.domElement.addEventListener('change', () => {
			const img = this.context.Image.domElement.files[0];
			let formData = new FormData();
			formData.append('image', img);
			EventBus.publish('add-product-img-restaurant', formData);
		});
		super.bind();
	}
}