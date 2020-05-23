class Events {
    constructor() {
        this.setPage = 'set-page';
        this.addProductByRestaurant = 'add-product-by-restaurant';
        this.addProductByRestaurantError = 'add-product-by-restaurant-error';
        this.addRestaurant = 'add-restaurant';
        this.addRestaurantError = 'add-restaurant-error';
        this.addRestaurantPoint = 'add-restaurant-point';
        this.addProduct = 'add-product';
        this.personAmountChange = 'person-amount-change';
        this.checkoutSuccess = 'checkout-success';
        this.successLogin = 'success-login';
        this.successSignup = 'success-signup';
        this.successLogout = 'success-logout';
        this.successGeo = 'success-geo';
        this.logout = 'logout';
        this.deleteProd = 'delete-prod';
        this.updateBasket = 'update-basket';
        this.redirect = 'redirect';
        this.checkout = 'checkout';
        this.orderCheckoutError = 'order-checkout-error';
        this.signup = 'signup';
        this.login = 'login';
        this.signupError = 'signup-error';
        this.loginError = 'login-error';
        this.newLocation = 'new-location';
        this.changeLocation = 'change-location';
        this.deleteOrder = 'delete-order';
        this.updateUser = 'update-user';
        this.avatarUpdate = 'avatar-update';
        this.logoutError = 'logout-error';
        this.updateBioError = 'update-bio-error';
        this.updateAvatarError = 'update-avatar-error';
        this.newMessage = 'new-message';
        this.supportConnected = 'support-connected';
        this.loginRequest = 'login-request';
        this.signupRequest = 'signup-request';
        this.geoRequest = 'geo-request';
        this.signPopDisappear = 'signup-popup-disappear';
        this.logPopDisappear = 'login-popup-disappear';
        this.geoPopDisappear = 'geo-popup-disappear';
        this.profileViewUpdateUser = 'profile-view__update-user';
        this.askGeoError = 'ask-geo-error';
        this.geoConfirmed = 'geo-confirmed';
        this.geoConfirmationRequest = 'geo-confirmation-request';
        this.stopGeoConfirmation = 'stop-geo-confirmation';
        this.escButPressed = 'escape-button-pressed';
        this.restCategorySelected = 'rest-category-selected';
        this.notifRequest = 'notif-request';
        this.notifReceived = 'notif-received';
        this.basketChanged = 'basket-changed';
    }

    productAdded(id) {
        return this.addProduct + String(id);
    }

    productDeleted(id) {
        return this.deleteProd + String(id);
    }
}

export default new Events();
