"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} from "@/state/cartSlice";
import { FaTimes } from "react-icons/fa";
import { RootState, AppDispatch } from "@/state/store";
import Link from "next/link";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  const closeModal = () => dispatch(setIsCartOpen());

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/75 z-50 flex justify-end">
      <div className="relative bg-white w-full max-w-md h-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FaTimes className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={closeModal}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.size} • {item.color}
                    </p>
                    <p className="text-gray-900 font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => dispatch(decreaseCount({ id: item.id }))}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-ptext"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-secondary">
                        {item.count}
                      </span>
                      <button
                        onClick={() => dispatch(increaseCount({ id: item.id }))}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-ptext"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-ptext">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <Link
                  href="/cart"
                  onClick={closeModal}
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  View Cart
                </Link>
                <button
                  onClick={closeModal}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
