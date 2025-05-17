import { NavLink} from "react-router-dom";
import logo from "../../assets/logo_green800.png"
import { FaHome, FaShoppingCart } from "react-icons/fa";
import {useCartContext} from "../../context/CartContext.tsx";



const Header = () => {
  const {cart} = useCartContext();
  return (
    <header className="bg-green-800 flex items-center justify-between px-6 py-4 fixed top-0 left-0 right-0 z-10 shadow h-16">
      <a href="https://maps.app.goo.gl/iJJXSVGFx4wB57aE6" target="_blank">
        <img src={logo} alt="Logo" className="h-16 w-auto"/>
      </a>
      <nav className=" flex flex-row space-x-4">
        <NavLink to="/" className={"text-white"}>
          <FaHome className="h-6 w-6" />
        </NavLink>
        <NavLink to="/cart" className={" relative text-white"}>
          <FaShoppingCart className="h-6 w-6" />
          {cart.items.length > 0 &&
            (<span className="absolute bg-red-800 rounded-full top-4 left-2 px-2 text-xs">
              {cart.items.length}
            </span>)
          }

        </NavLink>
      </nav>
    </header>
  );
}

export default Header;