import Header from '../../components/header/header.js';
import {Login} from '../../components/login/login.js';
import SessionModel from '../../models/SessionModel.js';
import MainView from '../../views/MainView/mainView.js'
import SignupView from '../SignupView/signupView.js';
import ProfileView from '../ProfileView/profileView.js';
import RestaurantView from '../RestaurantView/restaurantView.js';
import UserModel from '../../models/UserModel.js';
import EventBus from '../../services/EventBus.js';

class LoginView {
	constructor(parent = document.getElementById('application')) {
		this.parent = parent;

	}

	render() {
		this.parent.innerHTML = '';
		this.parent.innerHTML += Header.getInstance().render();
		this.parent.innerHTML += new Login(this.parent).render();

		const button = document.getElementsByClassName('login__button')[0];
		button.addEventListener('click', function (evt) {
			const username = document.getElementsByName('username')[0].value;
			const password = document.getElementsByName('password')[0].value;

			SessionModel.login(username, password).then(response => {
			    if (!response.error) {
				    EventBus.publish('updateUser', response);
					MainView.render();
			    } else {
			    	alert("No login.")
			    }
			}).catch(err => console.log(err));

		});

		UserModel.getUser().then(response => {
			if (response.error) {
				document.querySelector('.login').addEventListener('click', (evt) => {
					evt.preventDefault();
					LoginView.render();
				});

				document.querySelector('.signup').addEventListener('click', (evt) => {
					evt.preventDefault();
					SignupView.render();
				});
			} else {
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
						debugger;
						LoginView.render();
					})
				});
			}
		}).catch(error => console.log(error));

		document.querySelector('.main__logo').addEventListener('click', (evt) => {
			evt.preventDefault();
			MainView.render();
		});
	}
}

export default new LoginView();
