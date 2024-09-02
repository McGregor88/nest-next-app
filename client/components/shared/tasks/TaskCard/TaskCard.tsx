import { FC } from 'react';
import { 
  Card,
} from '@mui/material/';
import { ITask } from '@/types/task';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  task: ITask;
  active?: boolean;
}


const TaskCard: FC<TaskCardProps> = ({ task, active = false }) => {
  return (
    <Card className={styles.task}>
      {task.name}
    </Card>
  );
}

export default TaskCard;
