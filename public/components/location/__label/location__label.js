export class LocationLabel {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const label = document.createElement('label');
        label.classList.add('location__label');
        label.textContent = 'Location';
        this.parent.appendChild(label);
    }
}