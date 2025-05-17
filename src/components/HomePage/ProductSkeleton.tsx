const ProductSkeleton = () => {
  return (
    <div className="bg-gray-100 rounded-xl shadow hover:shadow-md transition animate-pulse">
      <div className="w-full h-64 bg-gray-300 rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-8 bg-gray-300 rounded w-full mt-2" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
