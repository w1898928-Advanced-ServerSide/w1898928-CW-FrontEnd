import { useState } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import apiKeyService from "../services/apiKeyService";

const ApiKeyCreate = ({ userId, onKeyCreated }) => {
  const [expiresInDays, setExpiresInDays] = useState(30);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiKeyService.createApiKey(userId, expiresInDays);
      onKeyCreated(response.data);
      setSuccess("API key created successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create API key");
      setSuccess("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create New API Key
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Expires In (Days)"
        type="number"
        fullWidth
        margin="normal"
        value={expiresInDays}
        onChange={(e) => setExpiresInDays(e.target.value)}
        inputProps={{ min: 1 }}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Generate API Key
      </Button>
    </Box>
  );
};

export default ApiKeyCreate;
