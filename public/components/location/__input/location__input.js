export class LocationInput {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const input = document.createElement('input');
        input.placeholder = 'Your location'
        input.classList.add('location__input');
        this.parent.appendChild(input);

    }
}