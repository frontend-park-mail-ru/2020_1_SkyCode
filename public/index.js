import Router from './routing/Router.js';
import EventBus from './services/Events/EventBus.js';

EventBus.publish('set-page', {url: '/restaurant'});
