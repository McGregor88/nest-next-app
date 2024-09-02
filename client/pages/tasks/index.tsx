import { Grid2 as Grid, Card } from '@mui/material/';

import { ITask } from '@/types/task';
import MainLayout from '@/components/shared/layouts/MainLayout/MainLayout';
import TasksHeaderSection from '@/components/features/tasks/TasksHeaderSection/TasksHeaderSection';
import TaskList from '@/components/shared/tasks/TaskList/TaskList';

const tasks: ITask[] = [
  { _id: '1', name: 'Task 1', description: 'Description 1' },
  { _id: '2', name: 'Task 2', description: 'Description 2' },
];

function Index() {
  return (
    <MainLayout>
      <Grid container spacing={4} justifyContent="center">
        <Card style={{ width: 900 }}>
          <TasksHeaderSection />
          <TaskList tasks={tasks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default Index;
