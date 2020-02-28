import Header from '../../components/header/header.js';
import {Login} from '../../components/login/login.js';
import SessionModel from '../../models/SessionModel.js';
import MainView from '../../views/MainView/mainView.js';
import SignupView from '../SignupView/signupView.js';
import ProfileView from '../ProfileView/profileView.js';
import RestaurantView from '../RestaurantView/restaurantView.js';
import UserModel from '../../models/UserModel.js';
import EventBus from '../../services/EventBus.js';
import Validation from '../../services/InputValidation.js';

/**
 * Страница аутентификации
 */
class LoginView {
	constructor(parent = document.getElementById('application')) {
		this.parent = parent;
	}

	render() {
		Header.getInstance();

		UserModel.getUser().then(response => {
			if (response.error) {
				this.parent.innerHTML = '';
				this.parent.innerHTML += Header.getInstance().render(this.parent);
				this.parent.innerHTML += new Login().render();

				const button = document.getElementsByClassName('login__button')[0];
				button.addEventListener('click', function (evt) {
					evt.preventDefault();

					if (!Validation.validationCheck()) {
						console.log('form is invalid');
						return;
					}

					const username = document.getElementsByName('email')[0].value;
					const password = document.getElementsByName('password')[0].value;

					SessionModel.login(username, password).then(response => {
						if (!response.error) {
							EventBus.publish('updateUser', response);
							MainView.render();
						} else {
							Validation.setError('server_err', response.error);
						}
					}).catch(err => {
						Validation.setError('server_err', err.error);
					});

				});

				document.querySelector('.login').addEventListener('click', (evt) => {
					evt.preventDefault();
				});

				document.querySelector('.signup').addEventListener('click', (evt) => {
					evt.preventDefault();
					SignupView.render();
				});
			} else {
				MainView.render();

				document.querySelector('.profile').addEventListener('click', (evt) => {
					evt.preventDefault();
					UserModel.getUser().then(response => {
						ProfileView.render(response);
					}).catch(err => console.log(err));
				});

				document.querySelector('.restaurant').addEventListener('click', (evt) => {
					evt.preventDefault();
					RestaurantView.render();
				});

				document.querySelector('.logout').addEventListener('click', (evt) => {
					evt.preventDefault();
					SessionModel.logout().then(response => {
						EventBus.publish('deleteUser', response);
						LoginView.render();
					});
				});
			}
		}).catch(error => {
			console.log(error);
			console.log('loginView:line 73');
		}).finally(() => {
				document.querySelector('.main__logo').addEventListener('click', (evt) => {
					evt.preventDefault();
					MainView.render();
				});
			}
		);
	}
}

export default new LoginView();
