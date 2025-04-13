import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  showAddSuccessToast,
  showNameExistsToast,
  showNumberExistsToast,
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
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Name already exists")) {
          showNameExistsToast();
        } else if (errorMessage.includes("Number already exists")) {
          showNumberExistsToast();
        } else {
          toast.error("Failed to add contact. Please try again later.");
        }
      } else {
        toast.error("Failed to add contact. Please try again later.");
      }

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
