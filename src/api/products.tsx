export interface IProduct{
  id:number,
  title:string,
  price:number,
  description:string,
  category:string,
  image: string,
  rating:{
    rate: 3.9,
    count: number,
  }
}

const api = `https://fakestoreapi.com`;

export async function fetchProducts(): Promise<IProduct[]> {
  const res = await fetch(api + `/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}


export async function fetchProductsByCategory(category: string): Promise<IProduct[]> {
  const res = await fetch(api + `/products/category/` + category);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(api + `/products/categories` );
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}