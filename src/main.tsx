import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {HashRouter, Routes, Route} from "react-router-dom";
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import Layout from "./components/layout/Layout.tsx";
import {CartProvider} from "./context/CartContext.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </HashRouter>    </CartProvider>
  </StrictMode>,
)
