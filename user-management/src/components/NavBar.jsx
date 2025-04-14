import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import authService from "../services/authService";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  // Add setIsAuthenticated to props
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout initiated");
    authService.logout();

    // Update authentication state via prop function
    if (setIsAuthenticated) {
      setIsAuthenticated(false);
    }

    navigate("/login", { replace: true });
    window.location.reload(); // Ensures complete state reset
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
              <Button color="inherit" component={Link} to="/login">
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
