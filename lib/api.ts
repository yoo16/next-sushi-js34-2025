export async function fetchCategories() {
    const res = await fetch("/api/category/fetch.json");
    return res.json();
}

export async function fetchProducts() {
    const res = await fetch("/api/product/fetch.json");
    return res.json();
}