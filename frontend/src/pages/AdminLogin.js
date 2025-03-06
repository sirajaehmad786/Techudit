  import React from "react";
  import { Formik, Form } from "formik";
  import { Box, TextField, Button, Typography, Paper } from "@mui/material";
  import { adminLoginValidation } from "../validation/adminLoginValidation";
  import { loginAdmin } from "../services/userService";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";

  const AdminLogin = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
      try {
        const response = await loginAdmin(values);
        toast.success(response.message || "Login Successful!");
        console.log(response);
        
        navigate("/admin-dashboard");
      } catch (error) {
        const errorMessage =
        error.response?.data?.message || error.message || "Login failed!";
      
      toast.error(errorMessage);
  
      }
    };

    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" gutterBottom>Admin Login</Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={adminLoginValidation}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form>
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
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    );
  };

  export default AdminLogin;
