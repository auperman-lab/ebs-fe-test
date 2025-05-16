import {IProduct, fetchProducts} from "../api/products.tsx";
import {useEffect, useState} from "react";
import {Product, SortButton, FilterButton} from "../components/Home";
import { useSearchParams } from "react-router-dom";
import { SortKey } from "../utils/sortOptions";





const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") as SortKey | null;



  useEffect(() => {
    fetchProducts()
      .then(data => {
        let sorted = handleSort(data)
        setProducts(sorted);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [sort]);

  const handleSort = (data: IProduct[]) =>{
    let sorted = [...data];

    switch (sort) {
      case "ascending":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "descending":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break
      default:
        break;
    }

    return sorted;
  }


  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>

      <div className="flex flex-wrap justify-between items-center mb-6">
        <SortButton/>
        <FilterButton/>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: IProduct) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
