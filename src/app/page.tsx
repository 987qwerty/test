'use client'

import Cart from '@/components/Cart';
import ProductsSection from "@/components/ProductsSection";
import Reviews from "@/components/Reviews";

export default function Home() {

  return (
    <div className="">
      <Reviews/>
      <Cart/>
      <ProductsSection page={1}/>
    </div>
  );
}
