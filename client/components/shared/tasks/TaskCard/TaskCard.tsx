import { FC } from 'react';
import { useRouter } from 'next/router';

import styles from './TaskCard.module.scss';
import { Card, Box, Grid2 as Grid, IconButton } from '@mui/material/';
import { Delete as DeleteIcon } from '@mui/icons-material/';
import { ITask } from '@/types/task';

interface TaskCardProps {
  task: ITask;
  active?: boolean;
}

const TaskCard: FC<TaskCardProps> = ({ task, active = false }) => {
  const router = useRouter();

  return (
    <Card 
      className={styles.task}
      onClick={() => router.push(`/tasks/${task._id}`)}
    >
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          borderRadius: '4px',
          border: active? '1px solid #000' : 'none',
        }}
      >
        <Grid 
          container 
          direction="column" 
          style={{ 
            width: 200,
            margin: '0 20px',
          }}
        >
          <div>{task.name}</div>
          <div style={{ fontSize: '12px', color: 'gray' }}>{task.description}</div>
        </Grid>
        <IconButton 
          style={{ marginLeft: 'auto' }}
          onClick={event => event.stopPropagation()}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default TaskCard;
