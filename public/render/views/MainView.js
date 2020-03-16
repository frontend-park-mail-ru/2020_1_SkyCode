// import Block from "../block";
// import header from "../components/header";

class MainView extends Block {
    #user
    constructor({user} = {}) {
        super([
            new header({user}),
            // Далее остальные блоки
        ],
        []);
    }
}

export default MainView;