import Component from '../../Component';
import Button from '../../elements/button/Button';
import template from './FeedbackForm.hbs';
import RestaurantModel from '../../../models/RestaurantModel';
import Textarea from '../../elements/textarea/Textarea';
import NumberInput from '../../elements/numberInput/NumberInput';
import EventBus from '../../../services/Events/EventBus';
import NeonButton from '../../elements/neonButton/NeonButton';
import Events from '../../../services/Events/Events';


export default class FeedbackForm extends Component {
    constructor({
        classes,
        rate = 0,
        text,
        restaurantId,
        oldReview,
    }) {
        const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
        super(classes, {
            rate: strRate,
            RateInput: new NumberInput({
                classes: 'feedback-form__rate-input',
                id: 'feedback-form__rate-input',
                min: 1,
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
                value: text,
            }),
        });

        super.template = template;
        super.addContextData({
            SubmitButton: new Button({
                id: 'feedback-form__submit-button',
                classes: 'feedback-form__submit',
                text: oldReview === null ? 'Сохранить' : 'Изменить',
                callback: () => {
                    const body = {
                        rate: Number(this.context.RateInput.getValue()),
                        text: this.context.TextInput.domElement.value,
                    };

                    if (oldReview === null) {
                        RestaurantModel
                            .addRestaurantReview(restaurantId, JSON.stringify(body))
                            .then((response) => {
                                sessionStorage.message = 'Ваш отзыв успешно'
                                    + ' добавлен';
                                EventBus.publish(Events.setPage, {url: window.location.pathname});
                            })
                            .catch((err) => {
                                sessionStorage.message = 'Ошибка добавления'
                                    + ' отзыва';
                            });
                    } else {
                        RestaurantModel
                            .changeRestaurantReview(oldReview.id, JSON.stringify(body))
                            .then((response) => {
                                sessionStorage.message = 'Ваш отзыв успешно'
                                    + ' изменён';
                                EventBus.publish(Events.setPage, {url: window.location.pathname});
                            })
                            .catch((err) => {
                                sessionStorage.message = 'Ошибка изменения'
                                    + ' отзыва';
                            });
                    }
                },
            }),
        });
    }

    bind() {
        EventBus.subscribe(NumberInput.changeEvent('feedback-rate'), (rate) => {
            const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
            document.getElementById('feedback-form__stars').innerText = strRate;
        });
        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(NumberInput.changeEvent('feedback-rate'), (rate) => {
            const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
            document.getElementById('feedback-form__stars').innerText = strRate;
        });
        super.unbind();
    }
}
