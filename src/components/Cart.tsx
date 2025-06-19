'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type RootState = {
  cart: CartItem[]
}
type CartItem = {
  id: number
  title: string
  price: number
  image_url: string
  quantity: number
}

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart)
  const cartItems = Object.values(cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log(cartItems)
  if (cartItems.length === 0) {
    return <div className="p-6">Корзина пуста</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-4 border-b pb-4">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>Цена: {item.price} ₽</p>
            </div>
            
              <span>{item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <h2 className="text-xl">
          Итого: <strong>{totalPrice.toFixed(2)} ₽</strong> ({totalItems} шт.)
        </h2>
        <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}