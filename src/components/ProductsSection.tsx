'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useGetProductPageQuery, Product } from '@/services/productsApi'

export default function ProductsSection() {
  const { data, isLoading, error } = useGetProductPageQuery({page:1, limit: 20})

  if (isLoading ) return <p>Загрузка товаров...</p>
  if (error) return <p>Ошибка загрузки товаров</p>
  if (!data) return <p>Нет данных</p>

  return (
    <div className="grid m-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.items.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}