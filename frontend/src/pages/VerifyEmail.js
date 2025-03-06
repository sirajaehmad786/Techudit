import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Box, Button } from "@mui/material";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Invalid verification link.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:6060/api/user/verify-email?token=${token}`)
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((error) => {
        setStatus(error.response?.data?.message || "Verification failed.");
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      {loading ? <CircularProgress /> : <Typography variant="h5">{status}</Typography>}
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>Go to Home</Button>
    </Box>
  );
};

export default VerifyEmail;
