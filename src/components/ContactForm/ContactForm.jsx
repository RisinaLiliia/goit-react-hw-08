import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { resetFilter } from "../../redux/filters/slice";
import { selectAllContacts } from "../../redux/contacts/selectors";
import {
  showNameAlreadyExistsToast,
  showNumberAlreadyExistsToast,
} from "../../utils/toasts";
import { TextField, Button, Box } from "@mui/material";
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

  const handleSubmit = (values, actions) => {
    const { name, number } = values;

    const normalizedName = name.trim().toLowerCase();
    const normalizedNumber = number.replace(/[^0-9]/g, "");

    const nameMatch = contacts.find(
      contact => contact.name.trim().toLowerCase() === normalizedName
    );

    if (nameMatch) {
      showNameAlreadyExistsToast(nameMatch.name);
      return;
    }

    const numberMatch = contacts.find(
      contact =>
        contact.number && contact.number.replace(/[^0-9]/g, "") === normalizedNumber
    );

    if (numberMatch) {
      showNumberAlreadyExistsToast(numberMatch.name, numberMatch.number);
      return;
    }

    dispatch(addContact({ name, number }));
    dispatch(resetFilter());
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
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

