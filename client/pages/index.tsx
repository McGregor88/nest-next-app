import { observer } from 'mobx-react-lite';
import { useStores } from '@/lib/hooks';
import { Button } from '@mui/material';

import styles from './main.module.scss';
import MainLayout from '@/components/shared/layouts/MainLayout/MainLayout';

const Index = observer(() => {
  const {
    uiStore: { count, increment },
  } = useStores();

  return (
    <>
    <MainLayout>
      <div className={styles.center}>
        <h1>You are Welcome!</h1>
        <h3>You'll like it here!</h3>
        <div>{count}</div>
        <Button onClick={increment}>Increment</Button>
      </div>
    </MainLayout>
    </>
  );
});

export default Index;