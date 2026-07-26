import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const PublicLayout = () => {
  const [, setDummy] = useState(false);

  return (
    <div className="min-h-screen bg-bgLight dark:bg-gray-900 flex flex-col">
      <Header onToggleSidebar={() => setDummy((prev) => !prev)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;