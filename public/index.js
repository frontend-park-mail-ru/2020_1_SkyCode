import EventBus from './services/Events/EventBus.js';
// eslint-disable-next-line no-unused-vars
import Router from './routing/Router.js';
import BaseView from './render/views/BaseView/BaseView';
const v = new BaseView();
document.body.innerHTML = v.toString();
v.bind();
// EventBus.publish('set-page', {url: window.location.pathname});
