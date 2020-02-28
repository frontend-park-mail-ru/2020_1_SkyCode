import Header from '../../components/header/header.js';
import LoginView from '../LoginView/loginView.js'
import SignupView from '../SignupView/signupView.js'
import ProfileView from '../ProfileView/profileView.js';
import RestaurantView from '../RestaurantView/restaurantView.js'
import UserModel from '../../models/UserModel.js';
import EventBus from '../../services/EventBus.js';
import SessionModel from '../../models/SessionModel.js';
import RestaurantModel from '../../models/RestaurantModel.js';

/**
 * Основная страница веб-приложения
 */
class MainView {
    constructor(parent  = document.getElementById('application')) {
        this.parent = parent;
    }

    render() {
        Header.getInstance();

        UserModel.getUser().then(response => {
            if (response.error) {
                this.parent.innerHTML = '';
                this.parent.innerHTML += Header.getInstance().render(this.parent);

                document.querySelector('.login').addEventListener('click', (evt) => {
                    evt.preventDefault();
                    LoginView.render();
                });

                document.querySelector('.signup').addEventListener('click', (evt) => {
                    evt.preventDefault();
                    SignupView.render();
                });

                document.querySelector('.main__logo').addEventListener('click', (evt) => {
                    evt.preventDefault();
                    MainView.render();
                });
            } else {
                EventBus.publish('updateUser', response);

                this.parent.innerHTML = '';
                this.parent.innerHTML += Header.getInstance().render(this.parent);

                document.querySelector('.profile').addEventListener('click', (evt) => {
                    evt.preventDefault();
                    UserModel.getUser().then(response => {
                        ProfileView.render(response);
                    }).catch(err => console.log(err));
                });

                document.querySelector('.restaurant').addEventListener('click', (evt) => {
                    evt.preventDefault();
                    RestaurantModel.getRestaurant(2).then(response => {
                        if (response.error) {
                            console.log('err');
                            return;
                        }
                        RestaurantView.render(response);
                    }).catch(error => console.log(error));

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
        }).catch(err => console.log(err));
    }
}

export default new MainView();
