import { FC } from 'react';

import styles from './TaskCard.module.scss';
import { Card } from '@mui/material/';
import { ITask } from '@/types/task';

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
