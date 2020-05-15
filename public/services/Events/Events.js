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
        this.logout = 'logout';
        this.deleteProd = 'delete-prod';
        this.basketChanged = 'basket-changed';
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
    }
}

export default new Events();
