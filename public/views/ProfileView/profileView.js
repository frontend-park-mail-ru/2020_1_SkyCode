import Header from '../../components/header/header.js';
import {Profile} from '../../components/profile/profile.js';
import RestaurantView from '../RestaurantView/restaurantView.js';
import LoginView from '../LoginView/loginView.js'
import UserModel from '../../models/UserModel.js';
import SessionModel from '../../models/SessionModel.js';
import EventBus from '../../services/EventBus.js';
import RestaurantModel from '../../models/RestaurantModel.js'
import MainView from '../MainView/mainView.js';

class ProfileView {
	constructor(parent = document.getElementById('application'), user = {}) {
		this.parent = parent;
		this.render = this.render.bind(this);
	}

	static getInstance() {
		if (!ProfileView.instance) {
			ProfileView.instance = new ProfileView();
		}
		return ProfileView.instance;
	}

	render(user) {
		this.parent.innerHTML = '';
		this.parent.innerHTML += Header.getInstance().render();
		this.parent.innerHTML += new Profile(user).render();

		const profile = document.getElementsByClassName('profile__button')[0];
		profile.addEventListener('click', function (evt) {
			evt.preventDefault();

			const email = document.getElementsByName('username')[0].value;
			const firstName = document.getElementsByName('firstName')[0].value;
			const lastName = document.getElementsByName('lastName')[0].value;
			const src = document.getElementsByName('profilephoto')[0];

			let formData = new FormData();
			formData.append('email', email);
			formData.append('firstname', firstName);
			formData.append('lastname', lastName);
			formData.append('profilephoto', src.files[0]);

			UserModel.updateUser(formData).then(response => {
				ProfileView.getInstance().render(response);
			}).catch(err => console.log(err));
		});

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
}

export default new ProfileView();