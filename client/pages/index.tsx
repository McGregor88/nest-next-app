import MainLayout from "@/components/shared/layouts/MainLayout/MainLayout";

function Index() {
  return (
    <>
    <MainLayout>
      <div className="center">
        <h1>Добро пожаловать!</h1>
        <h3>Здесь тебе понравится!</h3>
      </div>
    </MainLayout>

    <style jsx>
    {`
      .center {
        display: flex;
        height: calc(100vh - 64px);
        flex-direction: column;
        align-items: center; 
        justify-content: center;
      }
    `}
    </style>
    </>
  );
}

export default Index;