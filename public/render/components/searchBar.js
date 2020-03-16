import Block from "../block";

class searchBar extends Block {
    constructor() {
        super([], [
            'searchbar',
            'header'
        ]);
    }

    HTML() {
        return '<input class="${classes}" type="text" placeholder="Search...">' +
            '<button type="submit">Submit</button>';
    }
}