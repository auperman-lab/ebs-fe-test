import { useState} from "react";
import { useSearchParams } from "react-router-dom";
import { SORT_OPTIONS, SortKey } from "../../utils/sortOptions";
import { FiMinus, FiPlus } from "react-icons/fi";

const SortButton = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort")? searchParams.get("sort"): "ascending" ;


  const handleSortSelect = (option: SortKey) => {
    searchParams.set("sort", option);

    if (option === "ascending") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", option);
    }
    setSearchParams(searchParams);
    setSortOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setSortOpen(prev => !prev)}
        className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
      >
        <span>Sort By</span>
        {sortOpen ? <FiMinus className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
      </button>

      {sortOpen && (
        <div className="absolute z-10 mt-2 w-46 bg-white border rounded shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            {SORT_OPTIONS.map(({ label, value }) => (
              <li
                key={value}
                onClick={() => handleSortSelect(value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  currentSort === value ? "font-semibold bg-gray-100 text-black" : ""
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  checked={currentSort === value}
                  readOnly
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 inline-flex mr-2 rounded-full border border-black  items-center justify-center`}
                >
                  {currentSort === value && (
                    <span className="block w-2 h-2 m-auto rounded-full bg-green-800"></span>
                  )}
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortButton;
