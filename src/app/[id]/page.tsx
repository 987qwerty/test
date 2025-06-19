'use client'

import Cart from "@/components/Cart";
import ProductsSection from "@/components/ProductsSection";
import Reviews from "@/components/Reviews";
import { useRouter } from 'next/compat/router'
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams()
  console.log(params)

  return (
    <div className="">
      <div className="bg-[#777777] m-10 mx-auto w-[80%] text-center rounded-md">
        <h1>Тестовое задание</h1>
      </div>
      <Reviews/>
      <Cart/>
      <ProductsSection page={parseInt(params.id)}/>
    </div>
  );
}
