export class Logo {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const logo = document.createElement('div');
        const h = document.createElement('h1');
        const a = document.createElement('a');
        a.dataset.section = 'main';
        a.href = '/';
        a.textContent = 'Delivery';
        h.appendChild(a);
        logo.appendChild(h);
        logo.classList.add('logo');
        this.parent.appendChild(logo);
    }
}