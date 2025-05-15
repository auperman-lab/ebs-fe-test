import { NavLink} from "react-router-dom";
import logo from "../../assets/logo.png"
import { FaHome, FaShoppingCart } from "react-icons/fa";


const Header = () => {
  return (
    <header className="bg-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 right-0 z-10 shadow">
      <NavLink to="/">
        <img src={logo} alt="Logo" className="h-15 w-auto"/>
      </NavLink>

      <nav className=" flex flex-row space-x-4">
        <NavLink to="/" className={({isActive}) => isActive ? "text-green-800" : "text-gray-700"}>
          <FaHome className="h-6 w-6" ></FaHome>
        </NavLink>
        <NavLink to="/cart" className={({isActive}) => isActive ? "text-green-800" : "text-gray-700"}>
          <FaShoppingCart className="h-6 w-6" ></FaShoppingCart>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;