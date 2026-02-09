/** @format */

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col bg-[#48484a]/20 rounded-full  pb-6 ">
        <h1 className="mb-2 text-5xl text-foreground/70 mb-10 font-medium">
          {product.title}
        </h1>
        <div className="mr-auto w-auto rounded-full bg-accent/60 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      {product.tags && product.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#48484a]/15 px-4 py-1.5 text-sm font-medium text-foreground/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-md leading-tight text-black font-400"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}
