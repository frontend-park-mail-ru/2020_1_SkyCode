import Block from '../block.js';

class searchBar extends Block {
    constructor() {
        super([], [
            'searchbar',
            'header'
        ]);
    }

    HTML() {
        return `<input class="${super.classes}" type="text" placeholder="Search...">` +
            '<button type="submit">Submit</button>';
    }
}

export default searchBar;