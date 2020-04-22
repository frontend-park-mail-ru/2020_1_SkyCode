import Component from '../../Component';
import Button from '../../elements/button/Button';
import template from './FeedbackForm.hbs';
import RestaurantModel from '../../../models/RestaurantModel';
import Textarea from '../../elements/textarea/Textarea';
import NumberInput from '../../elements/numberInput/NumberInput';


export default class FeedbackForm extends Component {
    constructor({classes, rate = 0, text, restaurantId}) {
        super(classes, {
            RateInput: new NumberInput({
                classes: 'feedback-form__rate-input',
                id: 'feedback-form__rate-input',
                min: 0,
                max: 5,
                value: rate,
                changeEventBasis: 'feedback-rate',
                isVertical: false,
            }),
            TextInput: new Textarea({
                classes: 'feedback-form__text-input',
                id: 'text-input',
                minLength: 2,
                maxLength: 255,
                isRequired: true,
                placeholder: 'Поделитесь своими впечатлениями',
            }),
        });

        super.template = template;
        super.addContextData({
            SubmitButton: new Button({
                classes: 'feedback-form__submit',
                text: 'Сохранить',
                callback: () => {
                    const body = {
                        rate: Number(this.context.RateInput.domElement.value),
                        text: this.context.TextInput.domElement.value,
                    };

                    RestaurantModel
                        .addRestaurantReview(restaurantId, JSON.stringify(body))
                        .then((response) => {
                            console.log('success fetch:' + response);
                        })
                        .catch((err) => {
                            console.log('err fetch:' + err);
                        });
                },
            }),
        });
    }
}
