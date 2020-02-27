import Header from '../../components/header/header.js';
import {Menu} from '../../components/menu/menu.js';
import LoginView from "../LoginView/loginView.js";
import UserModel from '../../models/UserModel.js';
import ProfileView from '../ProfileView/profileView.js';
import SessionModel from '../../models/SessionModel.js';
import EventBus from '../../services/EventBus.js';
import {Title} from '../../components/general/title/title.js';
import MainView from '../MainView/mainView.js';

class RestaurantView {
    constructor(parent = document.getElementById('application')) {
        this.parent = parent;
    }

    render(menu) {
        this.parent.innerHTML = '';
        this.parent.innerHTML += Header.getInstance().render();
        let rest = document.createElement('div');
        rest.classList.add('restaurant');
        rest.innerHTML += new Title(menu.name, 'restaurant__title').render();
        rest.innerHTML += new Menu(this.parent).render(menu);
        this.parent.innerHTML += rest.outerHTML;


        document.querySelector('.profile').addEventListener('click', (evt) => {
            evt.preventDefault();
            UserModel.getUser().then(response => {
                ProfileView.render(response);
            }).catch(err => console.log(err));
        });

        document.querySelector('.restaurant').addEventListener('click', (evt) => {
            evt.preventDefault();
        });

        document.querySelector('.logout').addEventListener('click', (evt) => {
            evt.preventDefault();
            SessionModel.logout().then(response => {
                if (response.message) {
                    EventBus.publish('deleteUser', response);
                    LoginView.render();
                }
            })
        });

        document.querySelector('.main__logo').addEventListener('click', (evt) => {
            evt.preventDefault();
            MainView.render();
        });
    }
}

export default new RestaurantView();