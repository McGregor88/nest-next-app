import { Container, Box } from '@mui/material';
import LoginForm from '@/components/shared/auth/LoginForm/LoginForm';

function Login() {
  return (
    <Container maxWidth="sm">
      <Box p={10}>
        <LoginForm />
      </Box>
    </Container>
  );
}

export default Login;
