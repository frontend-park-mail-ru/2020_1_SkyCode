import {NavLink} from "./__link/nav__link.js";


export class Nav {

    constructor(parent = document.body) {
        this.parent = parent;
        this.menuElements = {
            login: 'Log In',
            sinup: 'Sign Up',
            profile:'Profile',
        }
    }

    render() {

        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        console.log(this.menuElements);
        for (let key in this.menuElements) {
            const li = document.createElement('li');
            const a = new NavLink(li, `/${key}`, this.menuElements[key], key);
            a.render();
            ul.appendChild(li);
        }

        nav.appendChild(ul);
        nav.classList.add('nav')
        this.parent.appendChild(nav);

        }

}
