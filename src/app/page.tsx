'use client'

import ProductsSection from "@/components/ProductsSection";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <div className="">
      <div className="bg-[#777777] m-10 mx-auto w-[80%] text-center rounded-md">
        <h1>Тестовое задание</h1>
      </div>
      <Reviews/>
      <ProductsSection/>
    </div>
  );
}
