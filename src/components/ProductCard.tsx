'use client'

import React from 'react'
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
  description: String
  image_url: string
  quantity: number

}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch()

  const cart = useSelector((state: RootState) => state.cart)
  const items = Object.values(cart) as CartItem[]
  const item = items.find(i => i.id === product.id)
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
    <div className="bg-[#D9D9D9] rounded shadow p-4 flex flex-col text-black overflow-hidden">
      <div className="relative w-full h-auto mb-4 flex justify-center">
        <img
          src={product.image_url}
          alt={product.title}
          className="object-cover rounded"
        />
      </div>
      <h3 className="text-center font-semibold mb-2 text-3xl">{product.title}</h3>
      <p className="text-gray-700 mb-2 text-2xl text-wrap">{product.description}</p>

      <p className="text-gray-700 mb-2 text-center text-3xl">Цена: <span className="font-bold">{product.price} ₽</span></p>

      {!isInCart ? (
        <button 
          onClick={handleAddToCart}
          className="mt-auto bg-[#222222] h-13 text-white py-2 px-4 text-center  rounded-xl"
        >
          Купить
        </button>
      ) : (
        <div className="flex items-center justify-between lg:justify-around mt-auto">
          <button
            onClick={handleDecrement}
            className="bg-[#222222] w-13 h-13 text-white px-3 py-1 rounded-xl"
          >
            -
          </button>
          <span className='bg-[#222222] h-13 text-white w-[40%] text-center p-4 rounded-xl'>{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-[#222222] w-13 h-13 text-white px-3 py-1 rounded-xl"
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}