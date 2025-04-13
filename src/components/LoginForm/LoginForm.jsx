import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations"; 
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import css from "./LoginForm.module.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap() 
      .then(() => {
        actions.resetForm();
       
      })
      .catch((error) => {
        console.error("Login failed:", error);
        actions.setFieldError("email", error.message || "Login failed"); 
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
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
              "Log In"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
