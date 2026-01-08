'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import LoadingThreeDotsJumping from 'components/ui/loading-dots';
import { Pointer } from 'components/ui/pointer';
import StarBorder from 'components/ui/starborder-button';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonBaseClasses = 'w-full h-full flex items-center justify-center';
  const disabledClasses = 'cursor-not-allowed opacity-60';

  if (!availableForSale) {
    return (
      <StarBorder
        disabled
        className={clsx(buttonBaseClasses, disabledClasses)}
        color="gray"
      >
        Out Of Stock
      </StarBorder>
    );
  }

  if (!selectedVariantId) {
    return (
      <StarBorder
        disabled
        aria-label="Please select an option"
        className={clsx(buttonBaseClasses, disabledClasses)}
        color="gray"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </StarBorder>
    );
  }

  return (
    <StarBorder
      aria-label="Add to cart"
      className={clsx(buttonBaseClasses, 'hover:opacity-90 transition-opacity')}
      color="var(--color-accent)"
      speed="3s"
      disabled={pending}
    >
      <Pointer className="text-2xl">💖</Pointer>
      {pending ? (
        <LoadingThreeDotsJumping />
      ) : (
        <>
          <div className="absolute left-0 ml-4">
            <PlusIcon className="h-5" />
          </div>
          Add To Cart
        </>
      )}
    </StarBorder>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        if (finalVariant) {
          addCartItem(finalVariant, product);
          addItemAction();
        }
      }}
      className="w-full"
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
