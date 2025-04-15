import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      //Perform login
      await authService.login(username, password);

      //Fetch session user
      const currentUser = await authService.getCurrentUser();

      //Update context
      setUser(currentUser);
      setIsAuthenticated(true);

      //Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      //Handle errors - use server message or fallback
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 15}}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {/* Error display - only shows when error exists */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
