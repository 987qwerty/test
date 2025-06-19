'use client'

import Cart from '@/components/Cart';
import ProductsSection from "@/components/ProductsSection";
import Reviews from "@/components/Reviews";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams()

  return (
    <div className="">
      <Reviews/>
      <Cart/>
      <ProductsSection page={parseInt(params.id)}/>
    </div>
  );
}
