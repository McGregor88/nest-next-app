import { FC } from 'react';
import { Grid2 as Grid, TextField, Button } from '@mui/material/';

const TaskCreateForm = () => {
  return (
    <Grid container direction="column">
      <form 
        noValidate 
        autoComplete="off"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField label="Name" />
        <TextField 
          label="Description" 
          multiline
          rows={3}
          style={{ marginTop: '10px' }}
        />
        <Button type='submit' variant="contained" style={{ marginTop: '10px' }}>
          Create
        </Button>
      </form>
    </Grid>
  );
}

export default TaskCreateForm;
