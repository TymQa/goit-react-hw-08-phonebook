import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact } from './contactsOperations';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  isLoading: false,
  addingLoader: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addContact.pending, (state) => {
        state.addingLoader = true;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.addingLoader = false;
        state.error = null;
        state.items.unshift(payload);
        toast.success('ADDED !');
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.addingLoader = false;
        state.error = payload;
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.error = null;
        state.items = state.items.filter((item) => item.id !== payload);
        toast.info('DELETED !');
      })
      .addCase(removeContact.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const getContacts = (state) => state.contacts;