"use client";

import { useFormState } from 'react-dom';
import { Container, Box, Button } from '@mui/material';
import { GoogleLoginButton } from 'react-social-login-buttons';

import login from './login';

function Login() {
  const [state, formAction] = useFormState(login, { error: "" });

  return (
    <Container maxWidth="sm">
      <Box p={10} sx={{ paddingTop: '200px' }}>
        <form action={formAction}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="form-control" style={{ marginTop: '10px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`input input-bordered w-full max-w-xs ${
                  state?.error && "input-error"
                }`}
              />
            </div>
  
            <div className="form-control" style={{ marginTop: '10px' }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`input input-bordered w-full max-w-xs ${
                  state?.error && "input-error"
                }`}
              />
            </div>
  
            {state?.error}
            <Button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
              Login
            </Button>
            <div className="flex">
              <GoogleLoginButton
                onClick={() =>(window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)}
                style={{ marginTop: '10px' }}
              />
            </div>
          </div>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
