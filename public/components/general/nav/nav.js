import {NavLink} from "./__link/nav__link.js";

/**
 * Компонент, генерирующий навигационную панель в
 * соответствии с переданным контекстом
 */
export class Nav {
    constructor() {
    }

    render(context) {
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        for (let key in context) {
            const li = document.createElement('li');
            const a = new NavLink(li, `/${key}`, context[key], key);
            a.render();
            ul.appendChild(li);
        }

        nav.appendChild(ul);
        nav.classList.add('nav');

        return nav.outerHTML;
    }
}
