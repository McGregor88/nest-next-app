import MainNavigation from "@/components/shared/navigation/MainNavigation/MainNavigation";

function Index() {
  return (
    <>
      <MainNavigation />

      <div className="center">
        <h1>Добро пожаловать!</h1>
        <h3>Здесь тебе понравится!</h3>
      </div>

      <style jsx>
      {`
        .center {
          margin-top: 64px;
          height: calc(100vh - 64px);
          display: flex;
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