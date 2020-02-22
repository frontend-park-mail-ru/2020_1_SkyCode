export class LoginInputUsername {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const input = document.createElement('input');
        input.classList.add('login__input');
        input.placeholder = 'username';
        input.type = 'email';
        this.parent.appendChild(input);
    }
}

export class LoginInputPassword {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const input = document.createElement('input');
        input.classList.add('login__input');
        input.placeholder = 'password';
        input.type = 'password';
        this.parent.appendChild(input);
    }
}