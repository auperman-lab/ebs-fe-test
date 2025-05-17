import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";

interface SearchProductsProps {
  isOpen: boolean;
  toggle: () => void;
}

const SearchProducts: React.FC<SearchProductsProps> = ({isOpen, toggle}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search")?? "";

  useEffect(()=>{
    if (currentSearch) {
      setSearchTerm(currentSearch);
    }
  }, [currentSearch]);


  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = searchTerm.trim();
      if (trimmed) {
        searchParams.set("search", trimmed);
      } else {
        searchParams.delete("search");
      }

      setSearchParams(searchParams);
    }
    if(searchTerm == ""){
      setSearchParams("");
    }
  };

  return (
    <div className="flex items-center space-x-2 text-gray-700">
      <div
        onClick={toggle}
        className="flex items-center space-x-2 cursor-pointer hover:text-black transition-colors"
      >
        {isOpen ? (
          <IoCloseOutline className="w-6 h-6" />
        ) : (
          <IoSearchOutline className="w-5 h-5" />
        )}
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchSubmit}
        placeholder="Search products..."
        className={`
          transition-all duration-300 ease-in-out 
          border border-gray-300 rounded-md px-3 py-1
          focus:outline-none focus:ring-2 focus:ring-green-500
          ${isOpen ? "w-48 opacity-100" : "w-0 opacity-0 px-0 border-transparent"}
        `}
        style={{ overflow: "hidden" }}
      />
    </div>
  );
};

export default SearchProducts;
