import {IoCloseOutline, IoFilterOutline} from "react-icons/io5";
import {useState} from "react";

const FilterButton =()=>{
  const [filterOpen, setFilterOpen] = useState(false);


  return (
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
  );
}

export default FilterButton;