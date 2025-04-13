import { Typography, Paper, Box, Alert, Button } from "@mui/material"; // Added Button import
import { useState } from "react";

const ApiKeyUsage = ({ apiKey }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your API Key
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography fontFamily="monospace">{apiKey}</Typography>
        <Button variant="outlined" onClick={handleCopy} sx={{ ml: 2 }}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Box>

      {copied && (
        <Alert severity="success" sx={{ mt: 2 }}>
          API key copied to clipboard!
        </Alert>
      )}

      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Use this key to authenticate your API requests by including it in the
        Authorization header.
      </Typography>
    </Paper>
  );
};

export default ApiKeyUsage;
