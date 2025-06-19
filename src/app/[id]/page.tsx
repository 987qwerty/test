'use client'

import Cart from '@/components/Cart';
import ProductsSection from "@/components/ProductsSection";
import Reviews from "@/components/Reviews";
import { useRouter } from 'next/compat/router'
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams()
  console.log(params)

  return (
    <div className="">
      <Reviews/>
      <Cart/>
      <ProductsSection page={parseInt(params.id)}/>
    </div>
  );
}
