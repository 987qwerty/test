'use client'

import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/cartSlice'
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '@/store/cartSlice'

type Product = {
  id: number
  title: string
  price: number
  image_url: string
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch()

  const cart = useSelector((state: RootState) => state.cart)
  const item = cart.find(i => i.id === product.id)
  const isInCart = !!item
  const quantity = item?.quantity || 0

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id))
  }

  const handleDecrement = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id))
    } else {
      dispatch(decrementQuantity(product.id))
    }
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
          onClick={handleAddToCart}
          className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Купить
        </button>
      ) : (
        <div className="flex items-center justify-between mt-auto">
          <button
            onClick={handleDecrement}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            +
          </button>
          <button
            onClick={() => dispatch(removeFromCart(product.id))}
            className="text-red-500 ml-2 text-sm"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  )
}