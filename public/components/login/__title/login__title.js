export class LoginTitle {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const title = document.createElement('h1');
        title.classList.add('login__title');
        title.textContent = 'Log In';
        this.parent.appendChild(title);
    }

}