'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import React, { useState, useEffect } from 'react';
import CheckoutForm from './CheckoutForm'


type RootState = {
  cart: CartItem[]
}
export type CartItem = {
  id: number
  title: string
  price: number
  description: String
  image_url: string
  quantity: number
}


export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Загружаем корзину 
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Ошибка парсинга корзины', e);
      }
    }
  }, [cart]);



  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mx-auto p-6 bg-[#D9D9D9] w-150 text-black rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-4 border-b pb-4">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>Цена: {item.price * item.quantity} ₽</p>
            </div>

            <span>{item.quantity} шт.</span>
            <span>{item.price} шт.</span>

          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <h2 className="text-xl">
          Итого: <strong>{totalPrice.toFixed(2)} ₽</strong> ({totalItems} шт.)
        </h2>
        <CheckoutForm cart={cartItems}/>
      </div>
    </div>
  );
}
