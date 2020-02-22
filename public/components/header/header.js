import {Logo} from "../logo/logo.js";
import {Nav} from "../nav/nav.js";
import {Location} from "../location/location.js";

export class Header {
    constructor(parent = document.body) {
        this.parent = parent;
    }

    render() {
        const header = document.createElement('header');
        header.classList.add('header');
        const logo = new Logo(header);
        const nav = new Nav(header);
        const location = new Location(header);

        logo.render();
        nav.render();
        location.render();

        this.parent.appendChild(header);
    }
}