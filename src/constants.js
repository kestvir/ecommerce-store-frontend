export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const apiURL = "/api";

export const endpoint = `${BASE_API_URL}${apiURL}`;

export const productListURL = `${endpoint}/products/`;
export const productDetailURL = id => `${endpoint}/products/${id}/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const checkoutURL = `${endpoint}/checkout/`;
export const addCouponURL = `${endpoint}/add-coupon/`;
export const countryListURL = `${endpoint}/countries/`;
export const userAccountInfo = `${endpoint}/auth/accounts/users/me/`;

export const userUsernameChange = `${endpoint}/auth/accounts/users/set_username/`;
export const userPasswordChange = `${endpoint}/auth/accounts/users/set_password/`;
export const userPasswordReset = `${endpoint}/auth/accounts/users/reset_password/`;
export const userPasswordResetConfirm = `${endpoint}/auth/accounts/users/reset_password_confirm/`;

export const addressListURL = addressType =>
    `${endpoint}/addresses/?address_type=${addressType}`;
export const addressCreateURL = `${endpoint}/addresses/create/`;
export const addressUpdateURL = id => `${endpoint}/addresses/${id}/update/`;
export const addressDeleteURL = id => `${endpoint}/addresses/${id}/delete/`;
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;
export const paymentListURL = `${endpoint}/payments/`;