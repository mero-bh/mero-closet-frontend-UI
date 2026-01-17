import { getCollectionProducts } from 'lib/shopify';
import { SingleProductCarousel } from '../single-product-carousel';

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: 'new-collections'
  });

  if (!products || !products.length) return null;

  return (
    <section className="w-full">
      <SingleProductCarousel products={products} />
    </section>
  );
}
