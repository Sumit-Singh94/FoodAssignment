import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ProductDetail() {
  const { barcode } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .then(res => res.json())
      .then(data => setProduct(data.product))
  }, [barcode])

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl p-6">
        <img
          src={product.image_front_url}
          className="h-64 mx-auto object-contain mb-6"
        />

        <h1 className="text-xl font-semibold mb-4 text-black">
          {product.product_name}
        </h1>

        <div className="mb-6">
          <h2 className="font-medium mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {product.ingredients?.map((ing, i) => (
              <li key={i}>{ing.text}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="font-medium mb-2">Nutritional Values (per 100g)</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <div>Energy: {product.nutriments?.energy_kcal} kcal</div>
            <div>Fat: {product.nutriments?.fat} g</div>
            <div>Carbohydrates: {product.nutriments?.carbohydrates} g</div>
            <div>Proteins: {product.nutriments?.proteins} g</div>
            <div>Salt: {product.nutriments?.salt} g</div>
          </div>
        </div>

        <div>
          <h2 className="font-medium mb-2">Labels</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {product.labels_tags?.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
              >
                {tag.replace("en:", "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
