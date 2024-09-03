import MainLayout from '@/components/shared/layouts/MainLayout/MainLayout';
import TaskCreateForm from '@/components/shared/tasks/TaskCreateForm/TaskCreateForm';

function Create() {
  return (
    <MainLayout>
      <div style={{ paddingTop: '50px' }}>
        <h1>Create</h1>
        <TaskCreateForm />
      </div>
    </MainLayout>
  );
}

export default Create;
