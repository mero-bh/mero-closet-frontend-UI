'use client';

import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

// Make sure to call this outside of your component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/checkout/success`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : "Pay Now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message" className="text-red-500 text-sm mt-2 text-center bg-red-50 p-2 rounded">{message}</div>}
        </form>
    );
}

export default function StripePayment({ clientSecret }: { clientSecret: string }) {
    if (!clientSecret) return <div className="p-4 border border-red-200 text-red-600 rounded">Missing Client Secret</div>;

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#000000',
            }
        },
    };

    return (
        <div className="w-full">
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} />
            </Elements>
        </div>
    );
}
