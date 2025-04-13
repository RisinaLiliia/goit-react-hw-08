import { toast } from "react-hot-toast";

export const showAddSuccessToast = (name) => {
  toast.success(`Contact ${name} was added successfully!`);
};

export const showDeleteSuccessToast = (name) => {
  toast.success(`Contact ${name} successfully deleted`);
};

export const showNameExistsToast = () => {
  toast.error("Contact with this name already exists! Consider renaming.");
};

export const showNumberExistsToast = () => {
  toast.error("Contact with this number already exists!");
};

export const showSearchSuccessToast = (count) => {
  toast.success(`Found ${count} contact(s)`);
};

export const showSearchErrorToast = () => {
  toast.error("Sorry, no contacts found!");
};

export const showFilterEmptyToast = () => {
  toast.error("Filter cannot be empty!");
};

export const showInvalidFilterToast = () => {
  toast.error("Invalid filter entered. Please try again.");
};

export const showRegistrationSuccessToast = () => {
  toast.success("Registration successful! Welcome aboard.");
};

export const showLoginSuccessToast = () => {
  toast.success("Login successful! Welcome back.");
};

export const showRegistrationErrorToast = () => {
  toast.error("Registration failed. Please try again.");
};

export const showLoginErrorToast = () => {
  toast.error("Login failed. Invalid credentials or server error.");
};

export const showFieldErrorToast = (field, message) => {
  toast.error(`Error in field "${field}": ${message}`);
};

export const showRegisterSuccessToast = () => {
  toast.success("Registration successful!");
};

export const showRegisterErrorToast = () => {
  toast.error("Registration failed. Please try again.");
};

export const showLogOutToast = () => {
  toast.success("Successfully logged out!");
};

export const showFilterSuccessToast = (count) => {
  toast.success(`Found ${count} contact(s)`);
};

export const showFilterErrorToast = () => {
  toast.error("Sorry, no contacts found with this filter!");
};

export const showContactCreationErrorToast = () => {
  toast.error("Error creating contact. The name or number might already exist.");
};

export const showNameAlreadyExistsToast = (existingName) => {
  toast.error(`Contact with the name "${existingName}" already exists!`);
};

export const showNumberAlreadyExistsToast = (existingName, existingNumber) => {
  toast.error(`This phone number "${existingNumber}" already exists and belongs to contact "${existingName}".`);
};