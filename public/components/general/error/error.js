export class ErrorComponent {
    constructor(...classnames) {
        this.classnames = classnames.join(' ');
    }

    render() {
        return `<div class="${this.classnames}"></div>`;
    }
}