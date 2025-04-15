import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  showAddSuccessToast,
  showDeleteSuccessToast,
} from "../../utils/toasts.js";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", newContact);
      showAddSuccessToast(newContact.name);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, name, number }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${id}`, { name, number });
      toast.success(`Contact "${data.name}" updated`);
      return data;
    } catch (error) {
      toast.error("Failed to update contact. Try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${contactId}`);
      showDeleteSuccessToast(data.name);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Contact not found!");
      } else {
        toast.error("Failed to delete contact. Please try again later.");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
