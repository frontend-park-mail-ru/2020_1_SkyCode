import {Header} from "../../components/header/header.js";
import {Login} from "../../components/login/login.js";

export class LoginView {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = '';
        const header = new Header(this.parent);
        const login = new Login(this.parent);

        header.render();
        login.render();
    }
}