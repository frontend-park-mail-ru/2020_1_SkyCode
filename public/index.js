import EventBus from './services/Events/EventBus.js';
// eslint-disable-next-line no-unused-vars
import Router from './routing/Router.js';
sessionStorage.message = '';
setTimeout(() => {
    EventBus.publish('set-page', {url: window.location.pathname});
}, 500);

