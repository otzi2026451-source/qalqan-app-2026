import { MARKET_PRODUCTS } from '../../../../lib/qalqan-data';
import { ProductDetailClient } from './ProductDetailClient';

export function generateStaticParams() {
  return MARKET_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
