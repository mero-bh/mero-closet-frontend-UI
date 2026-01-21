'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Product } from 'lib/shopify/types'; // Ensure you have this type or remove if strict
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Price from './price';

export function SingleProductCarousel({ products }: { products: any[] }) {
    const [currentindex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds per slide
        return () => clearInterval(timer);
    }, [currentindex, isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    if (!products.length) return null;

    const product = products[currentindex];

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            {/* Main Content Container */}
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-8 md:flex-row md:py-16">

                {/* Image Section (9:16 Aspect Ratio) */}
                <div className="relative w-full flex-none md:w-1/2 lg:w-1/3">
                    <Link href={`/product/${product.handle}`} className="block relative aspect-[9/16] w-full overflow-hidden rounded-xl shadow-lg">
                        <Image
                            src={product.featuredImage?.url}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            priority={true}
                        />
                    </Link>
                </div>

                {/* Details Section */}
                <div className="flex w-full flex-col justify-center text-center bg-muted/30 rounded-full pt-30 pr-10 pb-10 pl-4 md:items-end md:text-right">
                    <h2 className="mb-4 text-5xl font-bold tracking-tight text-foreground/70 md:text-6xl">
                        {product.title}
                    </h2>

                    <div className="mb-6 text-2xl font-bold text-accent">
                        <Price
                            amount={product.priceRange.maxVariantPrice.amount}
                            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                        />
                    </div>

                    <div className="prose prose-lg mb-8 text-foreground/70 line-clamp-4 max-w-lg">
                        {product.description}
                    </div>

                    <Link
                        href={`/product/${product.handle}`}
                        className="inline-flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-black/70 border-1 border-black/60 px-8 py-3 text-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-neutral-800/80 dark:text-neutral-200"
                aria-label="Previous Slide"
            >
                <ArrowLeftIcon className="h-6 w-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-neutral-800/80 dark:text-neutral-200"
                aria-label="Next Slide"
            >
                <ArrowRightIcon className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {products.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 w-2 rounded-full transition-all ${idx === currentindex ? 'bg-accent w-4' : 'bg-neutral-300 dark:bg-neutral-600'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

        </div>
    );
}
