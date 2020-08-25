import {
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_REGISTER_ERRORS,
  RESET_LOGIN_ERRORS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: false,
  loginError: null,
  registerError: null,
  authError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        authError: null,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loginError: null,
        isAuth: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        registerError: null,
        isAuth: true,
        loading: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authError: action.payload,
        isAuth: false,
        loading: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loginError: action.payload,
        isAuth: false,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        registerError: action.payload,
        user: null,
        isAuth: false,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        loading: false,
      };
    case RESET_REGISTER_ERRORS:
      return {
        ...state,
        registerError: null,
      };
    case RESET_LOGIN_ERRORS:
      return {
        ...state,
        loginError: null,
      };
    default:
      return state;
  }
}
