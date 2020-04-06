import BaseController from './BaseController.js';

class Controller404 extends BaseController {
    execute() {
        document.body.innerHTML = '<b>404...zzz...404...zzz</b>';
    }

    stop() {}
}

export default new Controller404(undefined);
