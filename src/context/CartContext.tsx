import {createContext, ReactNode, useContext, useReducer} from "react";
import {IProduct} from "../api/products.tsx";


type CartState = {
  items: IProduct[];
};

type Action =
  | { type: "ADD_ITEM"; payload: IProduct }
  | { type: "REMOVE_ITEM"; payload: number } // by product id
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);


const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: [...state.items, { ...action.payload}],
      };

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
