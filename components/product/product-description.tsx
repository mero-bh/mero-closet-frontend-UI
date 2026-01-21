'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import SizeGuide from './size-guide';
import { useState } from 'react';
import { Ruler, ChevronRight } from 'lucide-react';

export function ProductDescription({ product }: { product: Product }) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-col bg-[#48484a]/20 rounded-full  pb-6 ">
        <h1 className="mb-2 text-5xl text-foreground/70 mb-10 font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-accent/60 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      <div
        onClick={() => setIsGuideOpen(true)}
        className="mb-6 flex flex-row items-center justify-between px-6 py-4 transition-all duration-300 ease-in-out hover:translate-y-1 hover:bg-[#48484a]/30 cursor-pointer bg-[#48484a]/20 rounded-full"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-full">
            <Ruler size={20} className="text-white" />
          </div>
          <span className="font-medium text-lg text-white/90">Size Guide</span>
        </div>
        <ChevronRight size={20} className="text-white/50" />
      </div>

      <SizeGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      <VariantSelector options={product.options} variants={product.variants} />
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
