import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import css from "./RegistrationForm.module.css";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        actions.setFieldError("email", error.message || "Registration failed.");
      });
  };

  return (
    <Box className={css.container}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form} autoComplete="off">
            <Box className={css.fieldContainer}>
              <Field name="name">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    error={Boolean(errors.name && touched.name)}
                    helperText={errors.name && touched.name && errors.name}
                    variant="outlined"
                    className={css.inputField}
                    autoFocus
                  />
                )}
              </Field>
            </Box>

            <Box className={css.fieldContainer}>
              <Field name="email">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    type="email"
                    error={Boolean(errors.email && touched.email)}
                    helperText={errors.email && touched.email && errors.email}
                    variant="outlined"
                    className={css.inputField}
                  />
                )}
              </Field>
            </Box>

            <Box className={css.fieldContainer}>
              <Field name="password">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    label="Password"
                    fullWidth
                    type="password"
                    error={Boolean(errors.password && touched.password)}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                    variant="outlined"
                    className={css.inputField}
                  />
                )}
              </Field>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
