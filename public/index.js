import EventBus from './services/Events/EventBus.js';
import Router from './routing/Router.js';

EventBus.publish('set-page', {url: window.location.pathname});
