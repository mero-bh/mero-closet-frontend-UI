'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import { ProductProvider } from 'components/product/product-context';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FlipCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);

    // Ensure we have a valid image URL
    const imageUrl = product.featuredImage?.url || '/placeholder.png';

    // Determine default variant (first available or first one) to pre-select options
    const defaultVariant = product.variants.find((v) => v.availableForSale) || product.variants[0];
    const initialState: Record<string, string> = {};

    if (defaultVariant) {
        defaultVariant.selectedOptions.forEach((option) => {
            initialState[option.name.toLowerCase()] = option.value;
        });
    }

    return (
        <ProductProvider initialState={initialState}>
            <div
                className="group relative w-full overflow-hidden rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg dark:hover:shadow-neutral-800/50"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Link href={`/product/${product.handle}`} className="block h-full w-full">
                        <Image
                            src={imageUrl}
                            alt={product.title}
                            fill
                            className={`object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        />

                        {/* Overlay Gradient (Subtle) */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
                    </Link>

                    {/* Quick Add Button (Desktop) */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 hidden md:block z-10">
                        <div className="w-full bg-white text-black font-semibold py-3 rounded-full shadow-xl flex items-center justify-center gap-2 hover:bg-neutral-100 transition-colors cursor-pointer">
                            {/* We wrap AddToCart to style it or use it solely as logic container */}
                            <div className="w-full [&_button]:w-full [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:gap-2">
                                <AddToCart product={product} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Details */}
                <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-4">
                        <Link href={`/product/${product.handle}`} className="block">
                            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {product.title}
                            </h3>
                        </Link>
                        {/* Price */}
                        <div className="flex flex-col items-end shrink-0">
                            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                                {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
                            </span>
                        </div>
                    </div>

                    {/* Variant Options (Color Preview if available) */}
                    {/* Placeholder for variants logic - checking styles/colors */}
                    <div className="flex gap-1 mt-2 h-4">
                        {/* We can simulate variant dots here if data exists */}
                        {/* Assuming first 3 variants might be colors for demo */}
                        {product.variants?.slice(0, 3).map((v, i) => (
                            <div key={v.id} className="w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600" title={v.title} />
                        ))}
                        {product.variants?.length > 3 && (
                            <span className="text-[10px] text-neutral-500 flex items-center h-3 ml-1">+{product.variants.length - 3}</span>
                        )}
                    </div>

                    {/* Mobile: Add to Cart Button (Always visible or different style) */}
                    <div className="mt-4 md:hidden">
                        <AddToCart product={product} />
                    </div>
                </div>
            </div>
        </ProductProvider>
    );
}
