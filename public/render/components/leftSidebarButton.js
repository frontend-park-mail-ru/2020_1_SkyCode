import Block from "../block.js";


class leftSidebarButton extends Block {
    constructor() {
        super([], [
            'button',
            'header__left-sidebar-button',
        ])
    }

    HTML() {
        return '<button class="${classes}">.</button>'
    }
}

export default leftSidebarButton;