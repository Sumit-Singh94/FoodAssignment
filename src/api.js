const BASE_URL = "https://world.openfoodfacts.org";

export async function fetchCategories() {
  const url = `${BASE_URL}/categories.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load categories");
  const data = await res.json();
  return (data.tags || []).slice(0, 50);
}

export async function searchProducts({
  searchTerm,
  category,
  sortBy,
  sortDir,
  page,
  pageSize
}) {
  const url = new URL(`${BASE_URL}/cgi/search.pl`);
  url.searchParams.set("json", "true");
  url.searchParams.set("page_size", pageSize.toString());
  url.searchParams.set("page", page.toString());
  if (searchTerm) url.searchParams.set("search_terms", searchTerm);
  url.searchParams.set("search_simple", "1");
  url.searchParams.set(
    "fields",
    [
      "code",
      "product_name",
      "image_front_small_url",
      "categories",
      "nutrition_grades",
      "ingredients_text"
    ].join(",")
  );
  if (category) {
    url.searchParams.set("tagtype_0", "categories");
    url.searchParams.set("tag_contains_0", "contains");
    url.searchParams.set("tag_0", category);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();
  const products = data.products || [];
  return { products, count: data.count || 0 };
}

export async function fetchProductByBarcode(barcode) {
  const url = `${BASE_URL}/api/v0/product/${barcode}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load product");
  const data = await res.json();
  if (!data || data.status !== 1) {
    throw new Error("Product not found");
  }
  return data.product;
}


