import {useCartContext} from "../context/CartContext.tsx";
import {IProduct} from "../api/products.tsx";
import ProductListItem from "../components/CartPage/ProductListItem.tsx";

const CartPage = () => {

  const { cart } = useCartContext();



  const totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);


  return (
    <div className="mt-20 px-8 flex flex-col md:flex-row gap-8 justify-between">
      {/* Left - Product List */}
      <div className="flex-1 max-w-120">
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
      </div>

      {/* Right - Total */}
      <div className="w-full md:w-64 bg-white p-6 rounded shadow h-fit">
        <h2 className="text-xl font-bold mb-2">Total</h2>
        <p className="text-green-700 text-lg font-semibold">{totalPrice.toFixed(2)} MDL</p>
        <button
          className="mt-4 w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
          disabled={cart.items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;