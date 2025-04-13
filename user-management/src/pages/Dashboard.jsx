import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") === "admin"; // Set role during login

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to the User Management System. Here you can manage your account
        and API keys.
      </Typography>

      {isAdmin && (
        <Button
          variant="contained"
          onClick={() => navigate("/admin")}
          sx={{ mt: 2 }}
        >
          Go to Admin Panel
        </Button>
      )}
    </Container>
  );
};

export default Dashboard;
