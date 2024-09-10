"use client";

import { useFormState } from 'react-dom';
import { Typography, Button, TextField } from '@mui/material';
import { GoogleLoginButton } from 'react-social-login-buttons';

import styles from './LoginForm.module.scss';
import { login } from '@/app/auth/login/login';

function LoginForm() {
  const [state, formAction] = useFormState(login, { error: "" });

  return (
    <form action={formAction} className={styles["login-form"]}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          display: { xs: 'none', md: 'flex' },
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        Login to your account
      </Typography>

      <TextField 
        variant="outlined"
        label="Email"
        placeholder='user@gmail.com'
        type="email"
        name="email"
        className={`${styles["form-control"]} ${state?.error && "input-error"}`}
        fullWidth
        required
      />

      <TextField 
        variant="outlined"
        label="Password"
        type="password"
        name="password"
        className={`${styles["form-control"]} ${state?.error && "input-error"}`}
        fullWidth
        required
      />

      <div className={styles["login-form__error"]}>{state?.error}</div>

      <Button 
        type="submit" 
        variant="contained"
        size="large" 
        className={styles["form-btn"]}
        fullWidth
      >
        Login
      </Button>

      <div className={styles["login-form__text-section"]}>OR</div>

      <GoogleLoginButton
        className={styles.btn}
        style={{
          width: '100%',
          height: '56px',
          margin: '16px 0 0',
          borderRadius: '4px',
          padding: '8px 22px',
        }}
        //onClick={() =>(window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)}
      />
    </form>
  );
}

export default LoginForm;
