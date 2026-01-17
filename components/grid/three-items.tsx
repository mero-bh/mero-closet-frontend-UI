import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { CarouselClient } from '../carousel-client';

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: 'new-collections'
  });

  if (!products || !products.length) return null;

  // Duplicate for looping effect if needed, similar to the main Carousel
  const carouselProducts = [...products, ...products].reverse();

  return (
    <section className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 pb-4">
      <CarouselClient>
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}_three_item_replacement`}
            className="relative aspect-[9/16] h-[50vh] max-h-[500px] w-2/3 max-w-[300px] flex-none snap-start md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                  position: 'bottom'
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </CarouselClient>
    </section>
  );
}
