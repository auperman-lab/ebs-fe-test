import {IProduct} from "../../api/products.tsx";
import {useCartContext} from "../../context/CartContext.tsx";
import React from "react";

const ProductListItem:React.FC<IProduct> = (product) =>{

  const {cart, dispatch } = useCartContext();

  const quantity = cart.items.find((item) => item.id === product.id)?.quantity ?? 1

  const handleQuantityButton = (type: "ADD_ITEM" | "REMOVE_ITEM") => {
    if (type === "REMOVE_ITEM") {
      dispatch({ type, payload: product.id });
    } else if (type === "ADD_ITEM") {
      dispatch({ type, payload: product });
    }
  };


  return (
    <li
      className="flex items-center justify-between gap-4 p-4 rounded"
    >
      <div className="flex-shrink-0 w-40 h-40 rounded overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col  gap-4">
        <div className={"gap-2"}>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-green-700 font-medium">{product.price} MDL</p>
          <h2 className="text-sm hidden sm:block">{product.description}</h2>
        </div>
        <p className="text-sm font-sm"><b>Total</b>: {product.price * quantity} MDL</p>


        <div
          className="flex items-center max-w-30 justify-between gap-2 mt-2  border border-green-800 text-green-800 hover:border-green-600">
          <button
            onClick={() => (handleQuantityButton("REMOVE_ITEM"))}
            className="px-2 py-1 "
          >
            −
          </button>
          <span className="px-3 text-lg font-semibold">
            {quantity}
          </span>
          <button
            onClick={() => (handleQuantityButton("ADD_ITEM"))}
            className="px-2 py-1 click-black"
          >
            +
          </button>
        </div>

      </div>
    </li>
  );

}

export default ProductListItem;