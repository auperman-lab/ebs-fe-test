import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";

const Layout = () => {
  return (
    <>
      <div className=" flex flex-col">
        <Header/>
        <main className="flex-grow min-h-screen pt-16">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;