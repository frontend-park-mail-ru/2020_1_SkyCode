
class Mocks {
    constructor() {
        this.initActions();
        this.initCategories();
        this.initProducts();
        this.initRestaurants();
    }

    get restaurants() {
        return this._restaurants;
    }

    get products() {
        return this._products;
    }

    get actions() {
        return this._actions;
    }

    get categories() {
        return this._categories;
    }

    initActions() {
        this._actions = [];
        for (let i = 1; i <= 5; i++) {
            this._actions.push({
                src: `/static/actions/action${i}.jpg`,
                href: `/static/actions/action${i}.jpg`,
                alt: 'cant load',
            });
        }
    }

    initCategories() {
        this._categories = [];

        const texts = [
            'Магазины',
            'Завтраки',
            'Индийская',
            'Узбекская',
            'Русская',
            'Обеды',
            'Мясо и рыба',
            'Здоровая еда',
            'Десерты',
            'Пироги',
            'Азиатская',
            'Шашлыки',
            'Фастфуд',
            'Бургеры',
            'Пицца',
            'Суши',
            'Великий пост',
        ];

        for (let i = 1; i <= 17; i++) {
            this._categories.push({
                src: `/static/categories/cat${i}.jpg`,
                text: texts[i - 1],
            });
        }
    }

    initProducts() {
        this._products = [{
            imageHref: 'static/basket/BBQBurger.jpg',
            quantity: 1,
            name: 'BBQ Burger',
            cost: 339,
        }, {
            imageHref: 'static/basket/FrenchFries.jpg',
            quantity: 2,
            name: 'French fries',
            cost: 139,
        }, {
            imageHref: 'static/basket/CocaCola.jpg',
            quantity: 1,
            name: 'Coca-cola',
            cost: 99,
        }, ];
    }

    initRestaurants() {
        this._restaurants = [{
            name: 'Badel Story',
            imageHref: '/static/restaurants/BagelStory.jpg',
            rate: 4.3,
            avgDeliveryTime: 45,
            href: '/restaurants/BadelStory',
        }, {
            name: 'La Paris Dakar',
            imageHref: '/static/restaurants/LaParisDakar.jpg',
            rate: 4.7,
            avgDeliveryTime: 25,
            href: '/restaurants/LaParisDakar',
        }, {
            name: 'The Estamient',
            imageHref: '/static/restaurants/TheEstamient.jpg',
            rate: 4.1,
            avgDeliveryTime: 35,
            href: '/restaurants/TheEstamient',
        }, {
            name: 'Badel Story',
            imageHref: '/static/restaurants/BagelStory.jpg',
            rate: 4.3,
            avgDeliveryTime: 45,
            href: '/restaurants/BadelStory',
        }, {
            name: 'La Paris Dakar',
            imageHref: '/static/restaurants/LaParisDakar.jpg',
            rate: 4.7,
            avgDeliveryTime: 25,
            href: '/restaurants/LaParisDakar',
        }, {
            name: 'The Estamient',
            imageHref: '/static/restaurants/TheEstamient.jpg',
            rate: 4.1,
            avgDeliveryTime: 35,
            href: '/restaurants/TheEstamient',
        },];
    }
}

export default new Mocks();





