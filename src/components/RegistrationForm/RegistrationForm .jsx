import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  InputAdornment,
  Typography,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import css from "./RegistrationForm.module.css";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
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

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      })
      .catch((error) => {
        const message = error?.toLowerCase?.() || "";
        if (message.includes("email") || message.includes("user")) {
          actions.setFieldError(
            "email",
            "This email is already registered. Please use a different email or log in."
          );
        } else {
          actions.setStatus("Registration failed. Please try again later.");
        }
        actions.setSubmitting(false);
      });
  };

  return (
    <Paper elevation={3} className={css.container}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create Account
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please fill in the form to create a new account.
      </Typography>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
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
              <Field name="name">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    error={Boolean(errors.name && touched.name)}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                    InputProps={{
                      endAdornment: !errors.name && touched.name ? (
                        <InputAdornment position="end">
                          <CheckCircleIcon style={{ color: "green" }} />
                        </InputAdornment>
                      ) : null,
                    }}
                  />
                )}
              </Field>
            </Box>

            <Box className={css.fieldContainer}>
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    type="email"
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email}
                    variant="outlined"
                    InputProps={{
                      endAdornment: !errors.email && touched.email ? (
                        <InputAdornment position="end">
                          <CheckCircleIcon style={{ color: "green" }} />
                        </InputAdornment>
                      ) : null,
                    }}
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
                    type="password"
                    autoComplete="new-password"
                    error={Boolean(errors.password && touched.password)}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    InputProps={{
                      endAdornment: !errors.password && touched.password ? (
                        <InputAdornment position="end">
                          <CheckCircleIcon style={{ color: "green" }} />
                        </InputAdornment>
                      ) : null,
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
    </Paper>
  );
}

