import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [barcode, setBarcode] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")

  useEffect(() => {
    fetch("https://world.openfoodfacts.org/categories.json")
      .then(res => res.json())
      .then(data => setCategories(data.tags || []))
  }, [])

  useEffect(() => {
    if (barcode) {
      fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        .then(res => res.json())
        .then(data => setProducts(data.product ? [data.product] : []))
      return
    }

    let url = `https://world.openfoodfacts.org/cgi/search.pl?json=true&page=${page}&page_size=12`

    if (query) url += `&search_terms=${query}`
    if (category) url = `https://world.openfoodfacts.org/category/${category}.json?page=${page}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const list = data.products || []
        setProducts(prev => (page === 1 ? list : [...prev, ...list]))
      })
  }, [page, query, category, barcode])

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "az") return a.product_name?.localeCompare(b.product_name)
    if (sort === "za") return b.product_name?.localeCompare(a.product_name)
    if (sort === "nutri-asc") return (a.nutrition_grade_fr || "").localeCompare(b.nutrition_grade_fr || "")
    if (sort === "nutri-desc") return (b.nutrition_grade_fr || "").localeCompare(a.nutrition_grade_fr || "")
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto p-4">
          <h1 className="text-xl md:text-2xl font-semibold mb-4 text-black">
            Food Product Explorer
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              placeholder="Search by product name"
              className="border rounded-lg px-3 py-2 w-full text-black focus:outline-none focus:ring"
              onChange={e => {
                setQuery(e.target.value)
                setBarcode("")
                setPage(1)
              }}
            />

            <input
              placeholder="Search by barcode"
              className="border rounded-lg px-3 py-2 w-full text-black focus:outline-none focus:ring"
              onChange={e => {
                setBarcode(e.target.value)
                setQuery("")
                setCategory("")
                setPage(1)
              }}
            />

            <select
              className="border rounded-lg px-3 py-2 w-full text-black focus:outline-none focus:ring"
              onChange={e => {
                setCategory(e.target.value)
                setBarcode("")
                setPage(1)
              }}
            >
              <option value="">All Categories</option>
              {categories.slice(0, 50).map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              className="border rounded-lg px-3 py-2 w-full text-black focus:outline-none focus:ring"
              onChange={e => setSort(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
              <option value="nutri-asc">Nutrition ↑</option>
              <option value="nutri-desc">Nutrition ↓</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map(p => (
            <ProductCard key={p.id || p.code} product={p} />
          ))}
        </div>

        {!barcode && (
          <div className="flex justify-center mt-10">
            <button
              className="px-8 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
              onClick={() => setPage(p => p + 1)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
