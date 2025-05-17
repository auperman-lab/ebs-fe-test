import { render, screen, fireEvent } from "@testing-library/react";
import FilterDrawer from "../components/HomePage/FilterDrawer"; // adjust path
import { MemoryRouter } from "react-router-dom";

describe("FilterDrawer Component", () => {
  const categories = ["electronics", "clothing", "books"];

  const renderComponent = (props = {}) => {
    return render(
      <MemoryRouter>
        <FilterDrawer
          isOpen={true}
          onClose={jest.fn()}
          categories={categories}
          {...props}
        />
      </MemoryRouter>
    );
  };

  it("renders the drawer when open", () => {
    renderComponent();
    expect(screen.getByText(/Filter/i)).toBeInTheDocument();
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /Clear/i })).toBeInTheDocument();
  });

  it("calls onClose when clicking the overlay or close button", () => {
    const onClose = jest.fn();
    render(
      <MemoryRouter>
        <FilterDrawer isOpen={true} onClose={onClose} categories={categories} />
      </MemoryRouter>
    );

    // Clicking overlay
    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Clicking close button
    const closeBtn = screen.getByRole("button", { name: /Close drawer/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("updates the search param when a category is clicked", () => {
    renderComponent();

    const categoryItem = screen.getByText("electronics");
    fireEvent.click(categoryItem);
  });

  it("clears the filter when Clear button is clicked", () => {
    renderComponent();

    const clearButton = screen.getByRole("button", { name: /Clear/i });
    fireEvent.click(clearButton);
  });
});
