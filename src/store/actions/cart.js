import { CART_START, CART_SUCCESS, CART_FETCH_FAIL, CART_FAIL } from "./types";
import { authAxios } from "../../utils";
import {
  orderSummaryURL,
  addToCartURL,
  orderItemDeleteURL,
  orderItemUpdateQuantityURL,
} from "../../constants";

export const cartStart = () => {
  return {
    type: CART_START,
  };
};

export const cartSuccess = (data) => {
  return {
    type: CART_SUCCESS,
    data,
  };
};

export const cartFetchFail = (error) => {
  return {
    type: CART_FETCH_FAIL,
    error: error,
  };
};

export const cartFail = (error) => {
  return {
    type: CART_FAIL,
    error: error,
  };
};

export const fetchCart = (token) => {
  return (dispatch) => {
    dispatch(cartStart());
    authAxios(token)
      .get(orderSummaryURL)
      .then((res) => {
        dispatch(cartSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(cartFetchFail(err));
      });
  };
};

export const addItemToCart = (slug, token) => {
  return (dispatch) => {
    dispatch(cartStart());

    authAxios(token)
      .post(addToCartURL, { slug })
      .then((res) => {
        dispatch(fetchCart(token));
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};

export const removeItemQuantityFromCart = (slug, token) => {
  return (dispatch) => {
    authAxios(token)
      .post(orderItemUpdateQuantityURL, { slug })
      .then((res) => {
        dispatch(fetchCart(token));
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};

export const removeItemFromCart = (itemID, token) => {
  return (dispatch) => {
    dispatch(cartStart());

    authAxios(token)
      .delete(orderItemDeleteURL(itemID))
      .then((res) => {
        dispatch(fetchCart(token));
      })
      .catch((err) => {
        dispatch(cartFail(err));
      });
  };
};
