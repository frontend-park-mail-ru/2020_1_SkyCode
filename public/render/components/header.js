import Block from "../block.js";
import leftSidebarButton from "leftSidebarButton.js";

class header extends Block {
    constructor({ user } = {}) {
        super([
            new leftSidebarButton(),
            new logo(),
            new searchBar(),
            new profileArea({ user }),
        ], []);
    }
}

export default header;