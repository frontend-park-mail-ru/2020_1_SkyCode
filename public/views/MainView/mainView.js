import {Header} from "../../components/header/header.js";

export class MainView {
    constructor(parent = document.body) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = '';
        const header = new Header(this.parent);
        header.render();
    }
}