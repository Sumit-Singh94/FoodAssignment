import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.code}`}
      className="bg-white rounded-xl border hover:shadow-md transition p-3 flex flex-col"
    >
      <div className="h-32 flex items-center justify-center mb-2">
        <img
          src={product.image_front_small_url}
          className="max-h-full object-contain"
        />
      </div>

      <h2 className="text-sm font-medium line-clamp-2">
        {product.product_name}
      </h2>

      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
        {product.categories}
      </p>

      <span className="mt-auto text-xs font-semibold text-gray-700">
        Nutrition: {product.nutrition_grade_fr?.toUpperCase()}
      </span>
    </Link>
  )
}
