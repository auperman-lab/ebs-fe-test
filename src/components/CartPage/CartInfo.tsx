import {useCartContext} from "../../context/CartContext.tsx";

const CartInfo = () => {

  const { cart } = useCartContext();
  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded shadow h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between text-sm mb-2">
        <span>Discounts</span>
        <span className="text-gray-500">Add</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Order value</span>
        <span>{totalPrice.toFixed(2)} MDL</span>
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span>Estimated shipping fee</span>
        <span className="text-green-600 font-medium">FREE</span>
      </div>

      <div className="flex justify-between text-lg font-bold border-t pt-4">
        <span>Total</span>
        <span>{totalPrice.toFixed(2)} MDL</span>
      </div>

      <button
        className="mt-6 w-full bg-green-700 text-white py-2  hover:bg-green-800 disabled:opacity-50"
        disabled={cart.items.length === 0}
      >
        Checkout
      </button>
    </div>

  );
}

export default CartInfo;