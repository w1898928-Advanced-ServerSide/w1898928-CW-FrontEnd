import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import ApiKeyCreate from "../components/ApiKeyCreate";
import ApiKeyList from "../components/ApiKeyList";
import ApiKeyUsage from "../components/ApiKeyUsage";
import apiKeyService from "../services/apiKeyService";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [apiKeys, setApiKeys] = useState([]);
  const [currentKey, setCurrentKey] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);
  const navigate = useNavigate();

  //Effect to redirect unauthenticated users to the login page
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  //Fetches API keys for the current user
  const fetchApiKeys = async () => {
    try {
      if (user && user.userId) {
        const data = await apiKeyService.getApiKeys(user.userId);
        setApiKeys(data);
      }
    } catch (error) {
      console.error("Error fetching API keys:", error.message);
    } finally {
      setApiLoading(false);
    }
  };

  //Effect to load API keys when user data is available
  useEffect(() => {
    if (user && user.userId) {
      fetchApiKeys();
    }
  }, [user]);

  //Handles new key creation
  const handleKeyCreated = (newKey) => {
    setCurrentKey(newKey.apiKey);
    fetchApiKeys();
  };

  //Handles key updates (revoke/delete)
  const handleKeyUpdate = async (action, apiId) => {
    try {
      if (action === "revoke") await apiKeyService.revokeApiKey(apiId);
      if (action === "delete") await apiKeyService.deleteApiKey(apiId);
      fetchApiKeys();
    } catch (error) {
      console.error(`Failed to ${action} API key:`, error.message);
    }
  };

  //Loading state render
  if (loading || apiLoading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading dashboard...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {currentKey && (
        <Box sx={{ my: 2 }}>
          <ApiKeyUsage apiKey={currentKey} />
        </Box>
      )}

      <Box sx={{ my: 4 }}>
        <ApiKeyCreate userId={user.userId} onKeyCreated={handleKeyCreated} />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your API Keys
        </Typography>
        <ApiKeyList
          userId={user.userId}
          apiKeys={apiKeys}
          onUpdate={handleKeyUpdate}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
