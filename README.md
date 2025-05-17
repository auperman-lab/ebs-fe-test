# Product Catalog App

Welcome! This is a simple project I built as part of a Front-End Developer test. It’s a basic product catalog where you can browse products, filter and sort them, and manage a shopping cart.

---

## What’s this about?

The app lets users:

- See a list of products (with images, names, prices, and categories)
- Filter products by category
- Sort products by price (low to high or high to low)
- Add and remove items from a shopping cart
- See what’s in their cart, adjust quantities, and view the total price
- Clear the entire cart with one click

---

## Technologies Used

- React
- TypeScript
- Tailwind
- React Testing Library & Jest

---

## How to run it

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3.Start the development server:
    ```bash
    npm run dev
    ```
4. Open your browser and go to:
    ```bash
    http://localhost:3000
    ```

## What I focused on
-Building a simple layout with header, footer, and main content area

-Routing between home and cart pages

-Managing cart state globally with React Context

-Fetching and displaying products from the API

-Filtering and sorting products 

-Adding/removing products from the cart with quantity controls

-Showing the total price and a clear cart button

-Writing a few tests to make sure components render and behave as expected

-Error Handling


## Botlenecks
- the api doesn't allow pagination, only limit therefore no pagination and no lazyloading :(
---
Thanks for checking out my project!