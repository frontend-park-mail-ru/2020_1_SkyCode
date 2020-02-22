import {Header} from "./components/header/header.js";
import {LoginView} from "./views/LoginView/loginView.js";
import {MainView} from "./views/MainView/mainView.js";

const application = document.getElementById("application")

const main = new MainView(application);
main.render();

const routes = {
    main: MainView,
    login: LoginView,
};

application.addEventListener('click', function (evt) {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        const view = new routes[target.dataset.section](application);
        view.render();
    }
});