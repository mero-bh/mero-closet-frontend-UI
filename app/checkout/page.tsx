import { initializePaymentSession } from 'lib/shopify';
import StripePayment from 'components/checkout/stripe-payment';

export default async function CheckoutPage() {
  const cart = await initializePaymentSession();

  if (!cart) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <p className="mt-4">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="rounded-xl border p-4 bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
            <h2 className="font-medium text-lg mb-2">Order Summary</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Items: {cart.totalQuantity}</p>
            <div className="mt-4 pt-4 border-t dark:border-neutral-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{cart.cost.subtotalAmount.amount} {cart.cost.subtotalAmount.currencyCode}</span>
              </div>
              {/* Shipping would be calculated here */}
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>{cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {cart.client_secret ? (
            <StripePayment clientSecret={cart.client_secret} />
          ) : (
            <div className="p-4 border border-yellow-200 bg-yellow-50 text-yellow-800 rounded">
              Payment session initialized but no client secret found. Please attempt to refresh.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
