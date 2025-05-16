import {IProduct, fetchProducts, fetchCategories, fetchProductsByCategory} from "../api/products.tsx";
import {useEffect, useState} from "react";
import {Product, SortButton, FilterDrawer} from "../components/HomePage";
import { useSearchParams } from "react-router-dom";
import { SortKey } from "../utils/sortOptions";
import {IoCloseOutline, IoFilterOutline} from "react-icons/io5";

const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
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
      .catch((err) => console.error(err))
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


  if (loading) return <div>Loading...</div>;

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
