import { render, screen } from "@testing-library/react";
import Product from "../components/HomePage/Product";
import { CartProvider } from "../context/CartContext.tsx";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 100,
  description: "Test Description",
  category: "Test",
  image: "https://via.placeholder.com/150",
  rating: {
    rate: 4.2,
    count: 10,
  },
};

describe("Product Component", () => {
  it("renders product title and correct number of green stars", () => {
    render(
      <CartProvider>
        <Product {...mockProduct} />
      </CartProvider>
    );

    // Check title is shown
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

  });

  it("renders correct number of green filled stars", () => {
    const { container } = render(
      <CartProvider>
        <Product {...mockProduct} />
      </CartProvider>
    );

    // Select all star SVGs rendered (5 total)
    const stars = container.querySelectorAll("svg");

    expect(stars.length).toBe(5);

    // Count how many stars have green fill
    const filledStars = Array.from(stars).filter(
      (star) => star.getAttribute("fill") === "#065f46"
    );

    // Rounded from 4.2 is 4
    expect(filledStars.length).toBe(4);
  });
});
