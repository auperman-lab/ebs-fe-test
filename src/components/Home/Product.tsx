import {IProduct} from "../../api/products.tsx";

const Product: React.FC<IProduct> = (product) => {
  return (
    <div key={product.id} className="bg-gray-100 rounded-xl shadow hover:shadow-md transition">
      <img src={product.image} alt={product.title} className="rounded-t-xl w-fit h-fit object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-green-700 font-semibold">{product.price}MDL</p>
        <button className="mt-2 bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800">
          Add to Cart
        </button>
      </div>
    </div>
  )

}

export default Product;