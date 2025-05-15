import {IProduct, fetchProducts} from "../api/products.tsx";
import {useEffect, useState} from "react";
import Product from "../components/Product.tsx";

const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;


  return (
    <div className="bg-white px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product:IProduct) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
