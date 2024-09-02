import { FC } from 'react';
import { 
  Grid2 as Grid, 
  Box,
} from '@mui/material/';
import { ITask } from '@/types/task';
import TaskCard from '../TaskCard/TaskCard';

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <Grid container direction="column">
      <Box p ={2}>
        {tasks.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
          />
        ))}
      </Box>
    </Grid>
  );
}

export default TaskList;
