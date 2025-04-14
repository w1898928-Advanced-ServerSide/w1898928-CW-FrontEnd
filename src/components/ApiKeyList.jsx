import { useState } from "react";
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
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { format } from "date-fns";

const ApiKeyList = ({ apiKeys, onUpdate }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);

    setTimeout(() => {
      setCopiedKey(null);
    }, 1000);
  };

  if (!apiKeys?.length) {
    return <Typography>No API keys found.</Typography>;
  }

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
              <TableCell
                sx={{
                  fontFamily: "monospace",
                  maxWidth: 400,
                  wordBreak: "break-word",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {key.apiKey}
                  <Tooltip
                    title={copiedKey === key.apiKey ? "Copied!" : "Copy"}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(key.apiKey)}
                      sx={{ ml: 1 }}
                    >
                      {copiedKey === key.apiKey ? (
                        <CheckIcon fontSize="small" />
                      ) : (
                        <ContentCopyIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>

              <TableCell>{key.isActive ? "Active" : "Revoked"}</TableCell>
              <TableCell>
                {format(new Date(key.expiresAt), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>
                {key.isActive && (
                  <Button
                    color="warning"
                    onClick={() => onUpdate("revoke", key.apiId)}
                  >
                    Revoke
                  </Button>
                )}
                <Button
                  color="error"
                  onClick={() => onUpdate("delete", key.apiId)}
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
