import {IProduct, fetchProducts, fetchCategories, fetchProductsByCategory} from "../api/products.tsx";
import {useEffect, useState} from "react";
import {Product, SortButton, FilterDrawer} from "../components/HomePage";
import { useSearchParams } from "react-router-dom";
import { SortKey } from "../utils/sortOptions";
import {IoCloseOutline, IoFilterOutline} from "react-icons/io5";
import ProductSkeleton from "../components/HomePage/ProductSkeleton.tsx";
import { VscDebugRestart } from "react-icons/vsc";


const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = (searchParams.get("sort") as SortKey) ?? "ascending";
  const type = searchParams.get("type");


  useEffect(() => {
    setLoading(true);
    const fetch = type ? fetchProductsByCategory(type) : fetchProducts();

    fetch
      .then((data) => {
        const sorted = handleSort(data);
        setProducts(sorted);
      })
      .catch(() =>setError("Failed to load products. Please try again later."))
      .finally(() => setLoading(false));
  }, [type, sort]);

  useEffect(() => {
    fetchCategories()
      .then(data =>{
        setCategories(data)
      })
      .catch(err => console.error(err))
  }, []);


  const handleSort = (data: IProduct[]) =>{
    const sorted = [...data];
    switch (sort) {
      case "descending":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break
      default:
        sorted.sort((a, b) => a.price - b.price);
        break;
    }
    return sorted;
  }


  if (loading) {
    return (
      <div className="bg-white px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">{type ?? "All Products"}</h2>

        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </section>
      </div>
    );
  }
  return (

    <div className="bg-white px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">{type ??"All Products"}</h2>

      <section className="flex flex-wrap justify-between items-center mb-6">
        <SortButton/>

        <div
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer transition-colors"
        >
          <span>Filter</span>
          {filterOpen ? (
            <IoCloseOutline className="w-6 h-6"/>
          ) : (
            <IoFilterOutline className="w-5 h-5"/>
          )}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {error && (
          <div className={"col-span-4"}>
            <div className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded mb-4">
              {error}
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <button
                onClick={() => window.location.reload()}
                className="w-20 h-20 bg-green-700 text-white rounded-full shadow hover:bg-green-800 transition flex items-center justify-center"
              >
                <VscDebugRestart className="w-10 h-10"/>
              </button>
            </div>
          </div>

        )}
        {products.map((product: IProduct) => (
          <Product key={product.id} {...product} />
        ))}
      </section>

      <FilterDrawer
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
      />
    </div>
  );
};

export default HomePage;
