import BaseController from './BaseController.js';
import NeonButton from '../render/elements/neonButton/NeonButton';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events';
import Swal from 'sweetalert2';
import MapModel from '../models/MapModel';
import MainController from './MainController';
import RestaurantModel from '../models/RestaurantModel';
import MapView from '../render/views/MapView/MapView.js';

class MapController extends BaseController {
    constructor(title = 'Map') {
        super(title);
        const UserGeo = [];
        this.startCatchEvents();
    }

    execute() {
        super.execute(new MapView());
        ymaps.ready(init);

        function init() {
            const myMap = new ymaps.Map('map', {
                center: [localStorage.getItem('longitude'), localStorage.getItem('latitude')],
                zoom: 17,
            });
            myMap.controls.remove('trafficControl');


            const myCollection = new ymaps.GeoObjectCollection({}, {
                preset: 'islands#redIcon',
                draggable: false,
            });

            RestaurantModel.getRestaurantsByAddress(1, 50, localStorage.getItem('deliveryGeo'))
                .then((response) => {
                    if (response.restaurants) {
                        for (const rest of response.restaurants) {
                            myCollection.add(new ymaps.Placemark([rest.points[0].map_point.longitude, rest.points[0].map_point.latitude],
                                {
                                    balloonContent: rest.id,
                                    balloonContentHeader: rest.name,
                                    balloonContentBody: rest.description,
                                    balloonContentFooter: new NeonButton({
                                        text: 'Заказать',
                                        id: rest.id,
                                        classes: `restaurant-${rest.id}`,
                                    }),

                                }));
                        }
                    }
                })
                .catch((err) => console.log(err));

            myMap.geoObjects.add(myCollection);
            myMap.geoObjects.events.add('balloonopen', (e) => {
                const id = e.get('target')['properties'].get('balloonContent');
                document.getElementById(id)
                    .addEventListener('click', (e) => {
                        e.preventDefault();
                        EventBus.publish(Event.setPage, {url: `/restaurants/${id}`});
                    });
                console.log(id);
            });
        }
    }


    startCatchEvents() {
        EventBus.subscribe(Event.changeLocation, this.ChangeLocation.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe(Event.changeLocation, this.ChangeLocation.bind(this));
    }

    ChangeLocation() {
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
                        localStorage.setItem('deliveryGeo', this.address);
                        localStorage.setItem('latitude', this.geopos.latitude);
                        localStorage.setItem('longitude', this.geopos.longitude);
                        document.getElementsByClassName('place-time-card__place-text')[0].innerHTML
                            = localStorage.getItem('deliveryGeo');
                        EventBus.publish(Event.setPage, {url: window.location.pathname});
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ошибка',
                            text: 'Попробуйте ввести более точный адрес.',
                            onClose: () => {
                                MainController.getValidAddress();
                            },
                        });
                    }
                });
        });
    }
}

export default new MapController();
