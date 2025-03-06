import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>Welcome Techerudite</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/customer-register")} sx={{ mb: 2 }}>
        Customer Register
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate("/admin-register")}>
        Admin Register
      </Button>
    </Box>
  );
};

export default Home;
