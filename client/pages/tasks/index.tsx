"use client"
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid2 as Grid, Card, Button } from '@mui/material/';

import { useStores } from '@/lib/hooks';
import MainLayout from '@/components/shared/layouts/MainLayout/MainLayout';
import TasksHeaderSection from '@/components/features/tasks/TasksHeaderSection/TasksHeaderSection';
import TaskList from '@/components/shared/tasks/TaskList/TaskList';

const Index = observer(() => {
  const {
    taskStore: { data, fetchTasks },
  } = useStores();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <MainLayout>
      <Grid container spacing={4} justifyContent="center">
        <Card style={{ width: 900 }}>
          <TasksHeaderSection />
          <Button onClick={fetchTasks}>
            Reload list
          </Button>
          <TaskList tasks={data} />
        </Card>
      </Grid>
    </MainLayout>
  );
});

export default Index;
