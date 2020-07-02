import { CART_START, CART_SUCCESS, CART_FETCH_FAIL, CART_FAIL } from "../actions/types";

const initialState = {
    shoppingCart: null,
    error: null,
    loading: false
};

const cartStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    };
}
const cartSuccess = (state, action) => {
    return {
        ...state,
        shoppingCart: action.data,
        error: null,
        loading: false
    };
};

const cartFetchFail = (state, action) => {
    return {
        ...state,
        shoppingCart: null,
        error: action.error,
        loading: false
    };
};

const cartFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_START:
            return cartStart(state, action);
        case CART_SUCCESS:
            return cartSuccess(state, action);
        case CART_FAIL:
            return cartFail(state, action);
        case CART_FETCH_FAIL:
            return cartFetchFail(state, action);
        default:
            return state;
    }
};

export default reducer;