'use strict';

import BaseController from './BaseController.js';
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';
import RestaurantModel from '../models/RestaurantModel.js';
import BasketController from './BasketController.js';
import Swal from 'sweetalert2';
import EventBus from '../services/Events/EventBus';
import MapModel from '../models/MapModel';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
        this.geopos;
    }

    execute() {
        if (localStorage.getItem('deliveryGeo') !== null) {
            RestaurantModel.getRestaurantsByAddress(1, 50, localStorage.getItem('deliveryGeo'))
                .then((response) => {
                    const actions = Mocks.actions;
                    const categories = Mocks.categories;
                    super.execute(new MainView({
                        actionArr: actions,
                        categoryArr: categories,
                        restaurantArr: Mocks.restaurants,
                        products: BasketController.basket.product,
                    }));
                })
                .catch((err) => console.log(err));
        } else {
            RestaurantModel.getRestaurants(1, 50)
                .then((response) => {
                    const actions = Mocks.actions;
                    const categories = Mocks.categories;
                    super.execute(new MainView({
                        actionArr: actions,
                        categoryArr: categories,
                        restaurantArr: response.restaurants,
                        products: BasketController.basket.product,
                    }));

                    this.getValidAddress();
                    // eslint-disable-next-line max-len
                    RestaurantModel.getRestaurantsByAddress(1, 50, localStorage.getItem('deliveryGeo'))
                        .then((response) => {
                            super.execute(new MainView({
                                actionArr: actions,
                                categoryArr: categories,
                                restaurantArr: response.restaurants,
                                products: BasketController.basket.product,
                            }));
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    startCatchEvents() {
        EventBus.subscribe('new-location', this.GetRestaurantsByAddress.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('new-location', this.GetRestaurantsByAddress.bind(this));
    }

    GetRestaurantsByAddress() {
        RestaurantModel.getRestaurantsByAddress(1, 50, localStorage.getItem('deliveryGeo'))
            .then((response) => {
                super.execute(new MainView({
                    actionArr: Mocks.actions,
                    categoryArr: Mocks.categories,
                    restaurantArr: response.restaurants,
                    products: BasketController.basket.product,
                }));
            })
            .catch((err) => console.log(err));
    }

    getValidAddress() {
        Swal.fire({
            title: '<h5>Введите адрес доставки</h5>',
            icon: 'question',
            allowEscapeKey: false,
            showCancelButton: false,
            allowOutsideClick: false,
            html:
                '<input type="text" id="suggest">',

            confirmButtonText:
                '<i class="fa fa-thumbs-up" id="address"></i> Подтвердить',
        });
        ymaps.ready(init);

        function init() {
            const suggestView = new ymaps.SuggestView('suggest');
        }

        document.getElementsByClassName('swal2-confirm')[0].addEventListener('click', (e) => {
            e.preventDefault();
            this.address = document.getElementById('suggest').value;
            MapModel.getCoordinates(this.address)
                .then((response) => {
                    if (response.geopos) {
                        this.geopos = response.geopos;
                        console.log(this.geopos);
                        localStorage.setItem('deliveryGeo', this.address);
                        localStorage.setItem('latitude', this.geopos.latitude);
                        localStorage.setItem('longitude', this.geopos.longitude);
                        document.getElementsByClassName('place-time-card__place-text')[0].innerHTML
                            = localStorage.getItem('deliveryGeo');
                        return;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ошибка',
                            text: 'Попробуйте ввести более точный адрес.',
                            onClose: () => {
                                this.getValidAddress();
                            },
                        });
                    }
                });
        });
    }
}

export default new MainController();
