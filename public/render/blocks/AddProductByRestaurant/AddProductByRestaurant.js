import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import neonButton from '../../elements/neonButton/neonButton.js';

export default class AddProductByRestaurant extends Component {
    constructor({classes}) {
        super(classes, {
            nameInput: new Input({
                classes: 'add-product-by-restaurant__input',
                id: 'add-product-by-restaurant__name-input',
                type: 'text',
                placeholder: 'Name',
            }),
            descriptionInput: new Input({
                classes: 'add-product-by-restaurant__input',
                id: 'add-product-by-restaurant__description-input',
                type: 'text',
                placeholder: 'Description',
            }),
            costInput: new Input({
                classes: 'add-product-by-restaurant__input',
                id: 'add-product-by-restaurant__cost-input',
                type: 'text',
                placeholder: 'Cost',
            }),
            categoryInput: new Input({
                classes: 'add-product-by-restaurant__input',
                id: 'add-product-by-restaurant__category-input',
                type: 'text',
                placeholder: 'Category',
            }),
            imgInput: new Input({
                classes: 'add-product-by-restaurant__input',
                id: 'add-product-by-restaurant__img-input',
                type: 'file',
                placeholder: 'Image',
            }),
            submitButton: new neonButton({
                classes: 'add-product-by-restaurant__submit',
                text: 'Add',
            })
        });
    }
}