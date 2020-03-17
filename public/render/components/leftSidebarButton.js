import Block from '../block.js';


class leftSidebarButton extends Block {
    constructor() {
        super([], [
            'button',
            'header__left-sidebar-button',
        ]);
    }

    HTML() {
        return `<button class="${super.classes}">.</button>`;
    }
}

export default leftSidebarButton;