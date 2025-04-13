import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import ApiKeyCreate from "../components/ApiKeyCreate";
import ApiKeyList from "../components/ApiKeyList";
import ApiKeyUsage from "../components/ApiKeyUsage";
import apiKeyService from "../services/apiKeyService"; // Changed to default import

const AdminPanel = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [currentKey, setCurrentKey] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await apiKeyService.getApiKeys(userId); // Updated call
        setApiKeys(response.data);
      } catch (error) {
        console.error("Error fetching API keys:", error);
      }
    };

    fetchApiKeys();
  }, [userId]);

  const handleKeyCreated = (newKey) => {
    setCurrentKey(newKey.apiKey);
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      {currentKey && <ApiKeyUsage apiKey={currentKey} />}

      <Box sx={{ my: 4 }}>
        <ApiKeyCreate userId={userId} onKeyCreated={handleKeyCreated} />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your API Keys
        </Typography>
        <ApiKeyList userId={userId} />
      </Box>
    </Container>
  );
};

export default AdminPanel;
