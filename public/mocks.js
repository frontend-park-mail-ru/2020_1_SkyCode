
class Mocks {
    constructor() {
        this.initActions();
        this.initCategories();
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
}

export default new Mocks();





