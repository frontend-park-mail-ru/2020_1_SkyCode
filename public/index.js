import EventBus from './services/Events/EventBus.js';

EventBus.publish('set-page', {url: window.location.pathname});
