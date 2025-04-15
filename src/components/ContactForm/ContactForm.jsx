import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { resetFilter } from "../../redux/filters/slice";
import { selectAllContacts } from "../../redux/contacts/selectors";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import css from "./ContactForm.module.css";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be 50 characters or less")
    .required("This field is required"),
  number: Yup.string()
    .matches(/^[+]?[0-9]{7,15}$/, "Invalid phone number")
    .required("This field is required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (values, actions) => {
    const { name, number } = values;
    const normalizedName = name.trim().toLowerCase();
    const normalizedNumber = number.replace(/[^0-9]/g, "");

    const nameMatch = contacts.find(
      (contact) => contact.name.trim().toLowerCase() === normalizedName
    );

    if (nameMatch) {
      setFormError(`The name "${name}" already exists in your contacts.`);
      return;
    }

    const numberMatch = contacts.find(
      (contact) =>
        contact.number &&
        contact.number.replace(/[^0-9]/g, "") === normalizedNumber
    );

    if (numberMatch) {
      setFormError(
        `The number "${number}" is already used for "${numberMatch.name}".`
      );
      return;
    }

    setFormError("");
    try {
      await dispatch(addContact({ name, number })).unwrap();
      dispatch(resetFilter());
      actions.resetForm();
    } catch {
      setFormError("Failed to add contact. Please try again later.");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Add a New Contact
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              Please fill in the form below to add a new contact to your phonebook.
              Make sure the name and number are unique.
            </Typography>
          </Box>

          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}

          <Box className={css.group}>
            <Field name="name">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.name && touched.name)}
                  helperText={<ErrorMessage name="name" />}
                  autoComplete="name"
                />
              )}
            </Field>
          </Box>

          <Box className={css.group}>
            <Field name="number">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Number"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.number && touched.number)}
                  helperText={<ErrorMessage name="number" />}
                  autoComplete="tel"
                />
              )}
            </Field>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={css.button}
          >
            Add contact
          </Button>
        </Form>
      )}
    </Formik>
  );
}


