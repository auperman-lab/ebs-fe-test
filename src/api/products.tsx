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

export async function fetchProducts(): Promise<IProduct[]> {
  const res = await fetch(`https://fakestoreapi.com/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
