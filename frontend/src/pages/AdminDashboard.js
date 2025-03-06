import React from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 350, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
