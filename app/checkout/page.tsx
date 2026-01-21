import CheckoutForm from 'components/checkout/checkout-form';
import PaymentSelector from 'components/checkout/payment-selector';
import UserMeasurementsDisplay from 'components/checkout/user-measurements-display';
import { initializePaymentSession } from 'lib/shopify';
import Image from 'next/image';

// Force dynamic rendering - checkout uses cookies
export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const cart = await initializePaymentSession();

  if (!cart) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <p className="mt-4">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 bg-[#FAFAFA]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

        {/* LEFT COLUMN: Billing Details */}
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-neutral-100">
            <CheckoutForm />
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary & Payment */}
        <div className="w-full lg:w-2/5 order-1 lg:order-2 space-y-6">

          {/* Order Summary Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 text-black">
            <h2 className="font-semibold text-lg mb-6">Your Order</h2>
            <div className="mb-6">
              <UserMeasurementsDisplay />
            </div>

            <div className="space-y-4 mb-6">
              {cart.lines.map((line) => (
                <div key={line.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative w-12 h-12 bg-neutral-100 rounded-lg flex-shrink-0">
                      {line.merchandise.product.featuredImage.url && (
                        <Image
                          src={line.merchandise.product.featuredImage.url}
                          alt={line.merchandise.product.featuredImage.altText}
                          fill
                          className="object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium truncate">{line.merchandise.product.title}</p>
                      <p className="text-xs text-neutral-500">{line.merchandise.title !== 'Default' ? line.merchandise.title : ''}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{line.cost.totalAmount.amount} {line.cost.totalAmount.currencyCode}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-neutral-100">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">{cart.cost.subtotalAmount.amount} {cart.cost.subtotalAmount.currencyCode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Shipping Fee</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span>{cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}</span>
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 text-black">
            <h3 className="font-medium mb-3">Have any Coupon Code?</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter coupon code" className="flex-1 p-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-sm text-black placeholder:text-neutral-400" />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">Apply</button>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 text-black">
            <h3 className="font-medium mb-4">Shipping Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-blue-100 bg-blue-50/30 rounded-xl cursor-pointer">
                <input type="radio" name="shipping" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                <span className="text-sm font-medium">Free Shipping</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-neutral-100 rounded-xl cursor-not-allowed opacity-60">
                <input type="radio" name="shipping" disabled className="text-blue-600 focus:ring-blue-500" />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-sm font-medium">Express</span>
                  <span className="text-xs font-bold">$10.99</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 text-black">
            <h3 className="font-medium mb-4">Payment Method</h3>
            <PaymentSelector cart={cart} />
          </div>

        </div>
      </div>
    </div>
  );
}
