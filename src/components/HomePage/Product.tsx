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
    <div className="bg-gray-100 rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col">
      <div className="w-full h-64 flex items-center justify-center bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>
      <div className="flex items-center justify-start mt-2 mx-4">
        {Array.from({length: 5}, (_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < Math.round(product.rating.rate) ? "#065f46" : "#e5e7eb"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"
            />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-500">
    ({product.rating.count})
  </span>
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between min-h-[120px]">
        <div>
          <h3 className="text-lg font-medium">{product.title}</h3>
          <p className="text-green-700 font-semibold">{product.price}MDL</p>
        </div>

        <button
          onClick={handleClick}
          className={`mt-4 text-white px-4 py-1 rounded max-w-50
          ${isInCart ? "bg-red-600 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"}`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  )

}

export default Product;