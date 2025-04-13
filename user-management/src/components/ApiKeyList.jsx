import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import apiKeyService from "../services/apiKeyService"; // Changed to default import

const ApiKeyList = ({ userId }) => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await apiKeyService.getApiKeys(userId); // Updated call
        setApiKeys(response.data);
      } catch (error) {
        console.error("Error fetching API keys:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, [userId]);

  const handleRevoke = async (apiId) => {
    try {
      await apiKeyService.revokeApiKey(apiId); // Updated call
      setApiKeys(
        apiKeys.map((key) =>
          key.apiId === apiId ? { ...key, isActive: false } : key
        )
      );
    } catch (error) {
      console.error("Error revoking API key:", error);
    }
  };

  const handleDelete = async (apiId) => {
    try {
      await apiKeyService.deleteApiKey(apiId); // Updated call
      setApiKeys(apiKeys.filter((key) => key.apiId !== apiId));
    } catch (error) {
      console.error("Error deleting API key:", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>API Key</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.apiId}>
              <TableCell>{key.apiKey.substring(0, 8)}...</TableCell>
              <TableCell>{key.isActive ? "Active" : "Revoked"}</TableCell>
              <TableCell>
                {new Date(key.expiresAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {key.isActive && (
                  <Button
                    color="warning"
                    onClick={() => handleRevoke(key.apiId)}
                  >
                    Revoke
                  </Button>
                )}
                <Button
                  color="error"
                  onClick={() => handleDelete(key.apiId)}
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApiKeyList;
