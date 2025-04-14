import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      console.log("Logout initiated");
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
