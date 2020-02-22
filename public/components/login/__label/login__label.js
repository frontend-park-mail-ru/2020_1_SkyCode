export class LoginLabelUsername {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const label = document.createElement('label');
        label.classList.add('login__label');
        label.textContent = 'Username';
        this.parent.appendChild(label);
    }
}

export class LoginLabelPassword {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const label = document.createElement('label');
        label.classList.add('login__label');
        label.textContent = 'Password';
        this.parent.appendChild(label);
    }
}