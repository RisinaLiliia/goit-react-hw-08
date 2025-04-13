import { createSlice, createSelector } from "@reduxjs/toolkit";
import { selectContactsFilter } from "../filters/selectors";
import { selectAllContacts } from "./selectors";
import { fetchContacts, addContact, deleteContact } from "./operations";

export const selectFilteredContacts = createSelector(
  [selectAllContacts, selectContactsFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter((contact) => {
      const phone = contact.number ? contact.number.replace(/[^0-9]/g, "") : "";
      const name = contact.name ? contact.name.toLowerCase() : "";

      if (/^\d+$/.test(normalizedFilter)) {
        return phone.includes(normalizedFilter);
      } else {
        return name.includes(normalizedFilter);
      }
    });

    return filteredContacts;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
      });
  },
});

export default contactsSlice.reducer;
