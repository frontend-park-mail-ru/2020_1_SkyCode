export class LoginButton {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const button = document.createElement('button');
        button.classList.add('login__button');
        button.textContent = 'Log In';
        button.type = 'submit';
        this.parent.appendChild(button);
    }
}