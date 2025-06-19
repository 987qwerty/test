'use client'

import React, { useState } from 'react'
import { useSendOrderMutation } from '@/services/orderApi'

type CartItem = {
  id: number
  title: string
  price: number
  image_url: string
  quantity: number
}
export default function CheckoutForm({cart} : {cart: CartItem[]}) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [sendOrder, { isLoading, isError }] = useSendOrderMutation()

 const validatePhone = (): boolean => {
  const phoneRegex = /^(\+7|8)[\s\-]?(?:$\d{3}$|\d{3})[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/

  // Проверяем формат
  return phoneRegex.test(phone) 
}

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validatePhone()) {
      setError(true)
      return
    }
    setError(false)

    try {
      const result = await sendOrder({
        phone,
        items: cart,
      }).unwrap()

      console.log('Заказ успешно оформлен:', result)
      setShowPopup(true)
    } catch (err) {
      console.error('Ошибка при оформлении заказа', err)
      setError(true)
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4 text-left">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Номер телефона
          </label>
          <input 
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">Введите корректный телефон</p>}
        </div>

        <button
          type="submit"
          className="bg-[#222222] text-white py-2 px-4 rounded-xl"
        >
          Заказать
        </button>
      </form>

      {/* Попап успеха */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#D9D9D9] p-6 rounded shadow-lg max-w-md w-full text-center">
            <h3 className="text-xl font-bold mb-2">Спасибо за заказ!</h3>
            <p className="mb-4">Ваш заказ успешно оформлен.</p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  )
}