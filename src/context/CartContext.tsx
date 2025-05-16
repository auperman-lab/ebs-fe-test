import {createContext, ReactNode, useContext, useReducer} from "react";
import {IProduct} from "../api/products.tsx";

interface CartType extends IProduct {
  quantity: number;
}

type CartState = {
  items: CartType[];
};

type Action =
  | { type: "ADD_ITEM"; payload: IProduct }
  | { type: "REMOVE_ITEM"; payload: number } // by product id
  | { type: "CLEAR_CART" };

const STORAGE_KEY = "cart";


const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);


const cartReducer = (state: CartState, action: Action): CartState => {
  let updatedItems = state.items;

  switch (action.type) {
    case "ADD_ITEM": {
      const existing = updatedItems.find((item) => item.id === action.payload.id);
      if (existing) {
        updatedItems = updatedItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

      } else {
        updatedItems = [...updatedItems, { ...action.payload, quantity: 1 }];
      }
      break;
    }

    case "REMOVE_ITEM":
      updatedItems = updatedItems
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      break;

    case "CLEAR_CART":
      updatedItems = [];
      break;

    default:
      return state;
  }
  saveCartToStorage(updatedItems);
  return { items: updatedItems };
}



  export const CartProvider = ({children}: { children: ReactNode }) => {
    const initialState: CartState = { items: [] };

    const [cart, dispatch] = useReducer(cartReducer, initialState ,() => getCartFromStorage());

    return (
      <CartContext.Provider value={{cart, dispatch}}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
  };




const saveCartToStorage = (items: CartType[]) => {
  // Save cart state wrapped in an object with items property
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
};

const getCartFromStorage = (): CartState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { items: [] };

  try {
    const parsed = JSON.parse(stored);
    if (parsed && Array.isArray(parsed.items)) {
      return parsed;
    }
  } catch {
    // ignore errors
  }
  return { items: [] };
};
