import { useRouter } from 'next/router';
import { 
  Grid2 as Grid, 
  Card,
  Box,
  Button 
} from '@mui/material/';

import { ITask } from '@/types/task';
import MainLayout from '@/components/shared/layouts/MainLayout/MainLayout';
import TaskList from '@/components/shared/tasks/TaskList/TaskList';

const tasks: ITask[] = [
  { _id: '1', name: 'Task 1', description: 'Description 1' },
  { _id: '2', name: 'Task 2', description: 'Description 2' },
];

function Index() {
  const router = useRouter();

  return (
    <MainLayout>
      <Grid container spacing={4} justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box sx={{ p: 3 }}>
            <Grid container justifyContent="space-between">
              <h2>Tasks list</h2>
              <Button onClick={() => router.push('/tasks/create')}>
                Create
              </Button>
            </Grid>
          </Box>
          <TaskList tasks={tasks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default Index;
