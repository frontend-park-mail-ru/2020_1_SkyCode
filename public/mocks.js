
class Mocks {
    constructor() {
        this.initActions();
        this.initCategories();
        this.initProducts();
        this.initRestaurants();
        this.initProfile();
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

    get profile() {
        return this._profile;
    }

    initProfile() {
        this._profile = {
            avatar: '/static/profile.png',
            href: '/login',
            phone: '+7(777)777-77-77',
            email: 'test@email.com',
        };
    }

    initActions() {
        this._actions = [];
        for (let i = 1; i <= 3; i++) {
            this._actions.push({
                src: `/static/actions/action${i}.jpeg`,
                href: `/static/actions/action${i}.jpeg`,
                alt: 'cant load',
            });
        }
        for (let i = 6; i <= 10; i++) {
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
            'All', // 1
            'Burgers',
            'Pizza',
            'Asian',
            'Barbecue',
            'Desserts',
            'Thai',
            'Sushi', // 8

            'Магазины',//9
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
            'Шашлыки',//20
            'Фастфуд',
            'Бургеры',
            'Пицца',
            'Суши',
            'Великий пост',//25
        ];

        for (let i = 1; i <= 8; i++) {
            this._categories.push({
                src: `/static/categories/cat${i}.svg`,
                text: texts[i - 1],
            });
        }


        for (let i = 9; i <= 25; i++) {
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
        }, {
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
        },];
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





