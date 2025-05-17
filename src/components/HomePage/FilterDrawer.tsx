import { IoCloseOutline } from "react-icons/io5";
import {useSearchParams} from "react-router-dom";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}


const FilterDrawer = ({ isOpen, onClose, categories }: FilterDrawerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("type")? searchParams.get("type"): "all" ;

  const handleFilterSelect = (option: string) => {
    searchParams.set("type", option);

    if (option === "all") {
      searchParams.delete("type");
    } else {
      searchParams.set("type", option);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      {isOpen && (
        <div
          data-testid="overlay"
          className="fixed inset-0  z-40"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} // semi-transparent green
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-400 
          flex flex-col justify-between ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div>
          <div className="flex justify-between  items-center p-4 border-b">
            <h2 className="text-lg  font-semibold">Filter</h2>
            <button onClick={onClose} aria-label="Close drawer">
              <IoCloseOutline className="w-6 h-6 " />
            </button>
          </div>

          <div className="p-4">
            <p className="mb-2 text-green-800 font-semibold">Categories</p>
            <ul>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleFilterSelect(category)}
                  className={`cursor-pointer py-1 px-2 rounded hover:bg-gray-100 ${
                    selectedCategory === category ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4">
          <button
            className="w-full py-2 border-2 border-green-600 rounded text-green-800 font-semibold hover:bg-green-100 transition"
            onClick={() => handleFilterSelect("all")}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
