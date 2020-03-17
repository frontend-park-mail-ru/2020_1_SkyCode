import Block from '../block.js';
import leftSidebarButton from './leftSidebarButton.js';
import logo from './logo.js';
import searchBar from './searchBar.js';
import profileArea from './profileArea.js';

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