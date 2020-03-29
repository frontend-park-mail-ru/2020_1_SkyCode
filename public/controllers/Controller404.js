import BaseController from './BaseController.js';

class Controller404 extends BaseController {
    show() {
        document.body.innerHTML = '<b>404...zzz...404...zzz</b>';
    }
    hide() {}
}

export default new Controller404(undefined);