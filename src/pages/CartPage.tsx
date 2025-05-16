import {useCartContext} from "../context/CartContext.tsx";
import {IProduct} from "../api/products.tsx";
import ProductListItem from "../components/CartPage/ProductListItem.tsx";
import CartInfo from "../components/CartPage/CartInfo.tsx";

const CartPage = () => {

  const { cart, dispatch } = useCartContext();

  const handleClearCart = () =>{
    dispatch({type: "CLEAR_CART"});
  }

  return (
    <div className="mt-20 px-8 flex flex-col md:flex-row gap-8 justify-between">
      {/* Left - Product List */}
      <aside className="flex-1 max-w-120">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.items.map((product: IProduct) => (
              <ProductListItem key={product.id} {...product} />
            ))}
          </ul>
        )}
      </aside>

      {/* Right - Total */}
      <aside className="w-full max-w-100 sticky top-24 self-start">
        <div className={"flex flex-col justify-between md:h-[80vh]"}>
          <CartInfo/>

          <button
            onClick={() => handleClearCart()}
            className={`border border-green-800 p-4 text-green-800 hover:text-green-600 hover:border-green-600
            ${cart.items.length === 0 ? "hidden": ""} `}
          >
            Clear Cart
          </button>

        </div>
      </aside>
    </div>
  );
}

export default CartPage;