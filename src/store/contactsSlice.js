import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  contacts: [],
  filter: '',
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get('https://665334e1813d78e6d6d78e6b.mockapi.io/contacts');
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async ({ name, number }) => {
  const response = await axios.post('https://665334e1813d78e6d6d78e6b.mockapi.io/contacts', { name, phone: number });
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await axios.delete(`https://665334e1813d78e6d6d78e6b.mockapi.io/contacts/${id}`);
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export const selectContacts = (state) => state.contacts.contacts;
export const selectFilter = (state) => state.contacts.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;
