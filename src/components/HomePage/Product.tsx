import {IProduct} from "../../api/products.tsx";
import {useCartContext} from "../../context/CartContext.tsx";


const Product: React.FC<IProduct> = (product) => {

  const { cart, dispatch } = useCartContext();

  const isInCart = cart.items.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch({ type: "REMOVE_ITEM", payload: product.id });
    } else {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow hover:shadow-md transition">
      <div className="w-100 h-100 items-center">
        <img src={product.image} alt={product.title} className="rounded-t-xl  h-[100%] object-cover"/>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-green-700 font-semibold">{product.price}MDL</p>
        <button
          onClick={handleClick}
          className={`mt-2 text-white px-4 py-1 rounded 
          ${isInCart ? "bg-red-600 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"}`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  )

}

export default Product;