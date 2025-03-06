import React from "react";
import { Formik, Form } from "formik";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { adminValidationSchema } from "../validation/adminValidation";
import { registerAdmin } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await registerAdmin(values);
      toast.success(response.message || "Admin Registered Successfully!");
      resetForm();
      // navigate("/user/admin-login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Registration failed!");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" gutterBottom>Admin Registration</Typography>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={adminValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors, touched }) => (
            <Form>
              <TextField
                fullWidth margin="dense" label="First Name" name="firstName"
                value={values.firstName} onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth margin="dense" label="Last Name" name="lastName"
                value={values.lastName} onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                fullWidth margin="dense" label="Email" name="email" type="email"
                value={values.email} onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth margin="dense" label="Password" name="password" type="password"
                value={values.password} onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2">Already have an account?</Typography>
          <Button onClick={() => navigate("/admin-login")} sx={{ ml: 1 }} color="primary">
            Login Here
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/")} fullWidth>
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminRegister;
