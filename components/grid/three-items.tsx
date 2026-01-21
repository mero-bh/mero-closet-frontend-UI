import { getCollectionProducts } from 'lib/shopify';
import { SingleProductCarousel } from '../single-product-carousel';
import { Spotlight } from 'components/ui/spotlight-new';

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: 'new-collections'
  });

  if (!products || !products.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-muted/30 dark:bg-muted/20 antialiased transition-colors duration-500">
      <Spotlight />
      <div className="relative z-10 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-5xl font-bold text-foreground/70">New Collections</h2>
          <p className="mt-2 text-foreground/70">Discover our latest arrivals</p>
        </div>
        <SingleProductCarousel products={products} />
      </div>
    </section>
  );
}
