'use client';

import { useState } from 'react';
import StripePayment from './stripe-payment';
import { Cart } from 'lib/shopify/types';

export default function PaymentSelector({ cart }: { cart: Cart }) {
    const [method, setMethod] = useState<'stripe' | 'cod'>('stripe');
    const countryCode = cart.shipping_address?.country_code?.toLowerCase();

    // Only enable COD for Bahrain (bh)
    const isCodAvailable = countryCode === 'bh';

    const handlePlaceOrder = async () => {
        // In a real implementation, you would:
        // 1. Initialize a "manual" payment session
        // 2. Complete the cart
        alert('Order Placed via Cash on Delivery! (Note: This requires "manual" provider in backend)');
    };

    return (
        <div className="space-y-4">
            {/* Stripe / Cards / Wallets */}
            <div className={`p-4 border rounded-xl transition-all ${method === 'stripe' ? 'border-blue-500 bg-blue-50/10 ring-1 ring-blue-500' : 'border-neutral-200'}`}>
                <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input
                        type="radio"
                        name="payment"
                        checked={method === 'stripe'}
                        onChange={() => setMethod('stripe')}
                        className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-black">Credit Card / Wallet</span>
                            <div className="flex gap-2 text-black">
                                <span className="text-xs border border-neutral-300 px-1.5 py-0.5 rounded flex items-center bg-white">
                                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.65.75-1.23 1.95-1.07 3s2.33-.76 3.03-1.48" /></svg>
                                    Pay
                                </span>
                                <span className="text-xs border border-neutral-300 px-1.5 py-0.5 rounded flex items-center bg-white">
                                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg>
                                    Pay
                                </span>
                                <span className="text-xs bg-[#635BFF] text-white px-2 py-0.5 rounded font-bold">Stripe</span>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">Pay securely with Credit Card, Apple Pay, or Google Pay.</p>
                    </div>
                </label>

                {method === 'stripe' && (
                    <div className="mt-4 pl-6 border-l-2 border-blue-100 ml-1">
                        {cart.client_secret ? (
                            <StripePayment clientSecret={cart.client_secret} />
                        ) : (
                            <div className="py-2 text-sm text-neutral-500">Initializing secure payment...</div>
                        )}
                    </div>
                )}
            </div>

            {/* Cash on Delivery */}
            <div className={`p-4 border rounded-xl transition-all ${method === 'cod' ? 'border-blue-500 bg-blue-50/10 ring-1 ring-blue-500' : 'border-neutral-200'} ${!isCodAvailable ? 'opacity-50 cursor-not-allowed bg-neutral-50' : 'bg-white'}`}>
                <label className={`flex items-center gap-3 w-full ${isCodAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                    <input
                        type="radio"
                        name="payment"
                        disabled={!isCodAvailable}
                        checked={method === 'cod'}
                        onChange={() => setMethod('cod')}
                        className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                        <span className="font-medium text-black">Cash on Delivery</span>
                        <p className="text-xs text-neutral-500 mt-1">
                            {isCodAvailable
                                ? "Pay with cash upon delivery. Only available for orders in Bahrain."
                                : "Cash on Delivery is only available for shipping to Bahrain."}
                        </p>
                    </div>
                </label>

                {method === 'cod' && isCodAvailable && (
                    <div className="mt-4 pl-6 ml-1">
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-black/10"
                        >
                            Place Order (Cash on Delivery)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
