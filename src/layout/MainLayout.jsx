import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
const MainLayout = () => {
  return (
    <section className="bg-gray min-h-screen flex flex-col gap-2">
      <Header />
      <Outlet />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: "#fff",
            color: "#1e1e1e",
          },
        }}
      />
    </section>
  );
};

export default MainLayout;
