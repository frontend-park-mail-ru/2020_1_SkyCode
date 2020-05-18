import EventBus from './services/Events/EventBus.js';
// eslint-disable-next-line no-unused-vars
import Router from './routing/Router.js';

sessionStorage.message = '';
setTimeout(() => {
    EventBus.publish('set-page', {url: window.location.pathname});
}, 500);

// Promise.all([
    // TagModel.create('Все', '/home/arthur/Learning/techno/front/2020_1_SkyCode/public/static/categories/cat1.svg'),
    // TagModel.create(2, 'Бургеры', '/static/categories/cat1.svg'),
    // TagModel.create(3, 'Пицца', '/static/categories/cat1.svg'),
    // TagModel.create(4, 'Азия', '/static/categories/cat1.svg'),
    // TagModel.create(5, 'Барбекю', '/static/categories/cat1.svg'),
    // TagModel.create(6, 'Десерты', '/static/categories/cat1.svg'),
    // TagModel.create(7, 'Тай', '/static/categories/cat1.svg'),
    // TagModel.create(8, 'Суши', '/static/categories/cat1.svg'),
// ]).then((responses) => {
//     console.log(responses);
// })
//     .catch((errors) => {
//         console.log(errors);
//     });
