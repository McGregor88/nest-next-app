import { useRouter } from 'next/router';
import { 
  Grid2 as Grid, 
  Box,
  Button 
} from '@mui/material/';

function TasksHeaderSection() {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="space-between">
        <h2>Tasks list</h2>
        <Button onClick={() => router.push('/tasks/create')}>
          Create
        </Button>
      </Grid>
    </Box>
  );
}

export default TasksHeaderSection;
