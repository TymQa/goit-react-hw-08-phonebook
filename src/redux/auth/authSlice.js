import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
} from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isLoadingUser: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user = payload.user;
        toast.success('Successfully registered!');
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error('Something is wrong, try again!');
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user = payload.user;
        toast.success('Successfully logged in!');
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error('Something is wrong, try again!');
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = { name: null, email: null };
        state.token = null;
        toast.success('Successfully logged out! Waiting for you to come back!');
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error('Something is wrong, try again later!');
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoadingUser = false;
        state.isLoggedIn = true;
        state.user = payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.isLoadingUser = false;
        state.error = payload;
      });
  },
});

export const getAuth = state => state.auth;