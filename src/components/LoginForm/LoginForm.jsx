import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import css from "./LoginForm.module.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleSubmit = (values, actions) => {
  dispatch(logIn(values))
    .unwrap()
    .then(() => {
      actions.resetForm();
      actions.setSubmitting(false); 
    })
    .catch((error) => {
      const message = error?.toLowerCase?.() || "";

      if (message.includes("user") || message.includes("email")) {
        actions.setFieldError(
          "email",
          "No user found with this email. Please check your email or fix the error."
        );
      } else if (message.includes("password")) {
        actions.setFieldError(
          "password",
          "Incorrect password. Please fix the error and try again."
        );
      } else {
        actions.setStatus("Login failed. Please try again later.");
      }

      actions.setSubmitting(false); 
    });
};


  return (
    <Paper elevation={3} className={css.formContainer}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Welcome Back
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please enter your email and password to log in to your account.
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, status }) => (
          <Form className={css.form} autoComplete="off" noValidate>
            {status && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mb: 2 }}
              >
                {status}
              </Typography>
            )}

            <Box className={css.fieldContainer}>
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    type="email"
                    autoComplete="email"
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email}
                    variant="outlined"
                  />
                )}
              </Field>
            </Box>

            <Box className={css.fieldContainer}>
              <Field name="password">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    error={Boolean(errors.password && touched.password)}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className={css.submitButton}
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
    </Paper>
  );
}


