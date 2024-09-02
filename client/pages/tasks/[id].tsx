import { useRouter } from "next/router";
import { Button, Grid2 as Grid } from "@mui/material";

import { ITask } from "@/types/task";
import MainLayout from "@/components/shared/layouts/MainLayout/MainLayout";

const taskPage = () => {
  const task: ITask = { 
    _id: '1', 
    name: 'Task 1', 
    description: 'Description 1' 
  };
  const router = useRouter();

  return (
    <MainLayout>
      <div style={{ paddingTop: '50px' }}>
        <Button
          variant="outlined"
          style={{ fontSize: '32px' }}
          onClick={() => router.push('/tasks')}
        >
          Back to list
        </Button>
        <Grid container direction="column">
          <h1>{task.name}</h1>
          <p>{task.description}</p>
        </Grid> 
      </div>
    </MainLayout>
  )
};

export default taskPage;