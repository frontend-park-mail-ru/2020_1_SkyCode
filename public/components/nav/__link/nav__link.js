export class NavLink {
    constructor(parent = document.body, link = '/', linkTitle = '', section) {
        this.parent = parent;
        this.link = link;
        this.linkTitle = linkTitle;
        this.section = section;
    }

    render() {
        const navLink = document.createElement('a');
        navLink.href = this.link;
        navLink.textContent = this.linkTitle;
        navLink.classList.add('nav__link');
        navLink.dataset.section = this.section;
        this.parent.appendChild(navLink);
    }
}