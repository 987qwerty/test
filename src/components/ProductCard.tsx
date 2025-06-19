"use client"

import { Product } from '@/services/productsApi'
import React, { useEffect, useState } from 'react'


type CartItem = {
  quantity: number
}


export default function ProductCard({product}: {product: Product}) {
    const [quantity, setQuantity] = useState<number>(0)
    const [isInCart, setIsInCart] = useState<boolean>(false)
    // Загружаем состояние корзины из localStorage
    useEffect(() => {
      const cart = JSON.parse(localStorage.getItem('cart') || '{}')
      if (cart[product.id]) {
        setIsInCart(true)
        setQuantity(cart[product.id].quantity)
      }
    }, [product.id])

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}')
        cart[product.id] = { quantity: 1 }
        localStorage.setItem('cart', JSON.stringify(cart))
        setQuantity(1)
        setIsInCart(true)
  }
    const updateQuantity = (newQuantity: number) => {
        if (newQuantity < 1) return
        const cart = JSON.parse(localStorage.getItem('cart') || '{}')
        cart[product.id] = { quantity: newQuantity }
        localStorage.setItem('cart', JSON.stringify(cart))
        setQuantity(newQuantity)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value)) updateQuantity(value)
    }
    const removeFromCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}')
        delete cart[product.id]
        localStorage.setItem('cart', JSON.stringify(cart))
        setQuantity(0)
        setIsInCart(false)
  }


  return (
    <div className="bg-white rounded shadow p-4 flex flex-col text-black">
      <div className="relative w-full h-auto mb-4">
        <img
          src={product.image_url}
          alt={product.title}
          className="object-cover rounded"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-700 mb-2">Цена: <span className="font-bold">{product.price} ₽</span></p>

      {!isInCart ? (
        <button
          onClick={addToCart}
          className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Купить
        </button>
      ) : (
        <div className="flex items-center justify-between mt-auto">
          <button
            onClick={() => updateQuantity(quantity - 1)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            className="w-12 text-center border rounded"
            min="1"
          />
          <button
            onClick={() => updateQuantity(quantity + 1)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            +
          </button>
          <button
            onClick={removeFromCart}
            className="text-red-500 ml-2 text-sm"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  )
}