import styles from './main.module.scss';
import MainLayout from "@/components/shared/layouts/MainLayout/MainLayout";

function Index() {
  return (
    <>
    <MainLayout>
      <div className={styles.center}>
        <h1>You are Welcome!</h1>
        <h3>You'll like it here!</h3>
      </div>
    </MainLayout>
    </>
  );
}

export default Index;