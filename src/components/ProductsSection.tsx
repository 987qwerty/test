'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useGetProductPageQuery } from '@/services/productsApi'
import { useRouter } from 'next/navigation'

type Product = {
      id: number
      title: string
      price: number
      description: String
      image_url: string
      quantity: number
}

export default function ProductsSection({page} : {page: number}) {
  const { data, isLoading, error }  = useGetProductPageQuery({page:page, limit: 20})
  const router = useRouter()

  if (isLoading ) return <p className='text-center m-10'>Загрузка товаров...</p>
  if (error) return <p className='text-center m-10'>Ошибка загрузки товаров</p>
  if (!data) return <p className='text-center m-10'>Нет данных</p>

  return (
    <div>
       <div className="grid m-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {data.items.map((product: Product) => (
           <ProductCard key={product.id} product={product} />
         ))}
      </div> 

      <div className="flex justify-around m-10">
        {page > 1 ? <button className='w-10 h-10 bg-[#D9D9D9] text-black text-2xl  rounded-2xl' onClick={() => router.push((page - 1).toString())}>{'<'}</button> : ""}
        
        <button className='w-10 h-10 bg-gray-200 text-black text-2xl  rounded-2xl' onClick={() => router.push((page + 1).toString())}>{'>'}</button>
      </div>
    </div>
  )
}