import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    role: string | null;
}

const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
};

const getRoleFromLocalStorage = (): string | null => {
    return localStorage.getItem('role');
};

const initialState: AuthState = {
    token: getTokenFromLocalStorage(),
    isAuthenticated: !!getTokenFromLocalStorage(),
    loading: false,
    error: null,
    role: getRoleFromLocalStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<{ login: string; role: string; id: string }>) => {
            state.token = action.payload.login;
            state.isAuthenticated = true;
            state.loading = false;
            state.role = action.payload.role;
            localStorage.setItem('token', action.payload.login);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('id', action.payload.id);
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;