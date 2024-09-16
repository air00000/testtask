import {AppDispatch} from "../../index";
import {loginFailure, loginRequest, loginSuccess} from "../../slices/auth/authSlice";


export const login = (login: string, role: string, id: string) => async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
        dispatch(loginSuccess({ login, role, id}));
    } catch (error) {
        dispatch(loginFailure('Неверный логин или пароль'));
    }
};