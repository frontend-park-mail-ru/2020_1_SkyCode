import MainView from '../MainView/MainView.js';

let actions = [];

for (let i = 1; i <= 5; i++) {
    actions.push({
        src: `/static/actions/action${i}.jpg`,
        href: `/static/actions/action${i}.jpg`,
        alt: 'cant load',
    });
}

const categories = [];
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
    categories.push({
        src: `/static/categories/cat${i}.jpg`,
        text: texts[i - 1],
    });
}

const mv = new MainView({actionArr: actions, categoryArr: categories});
document.body.innerHTML = (mv.HTML());
mv.bind();
