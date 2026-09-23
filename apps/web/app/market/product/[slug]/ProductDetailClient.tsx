'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Plus,
} from 'lucide-react';
import { AppShell } from '../../../../components/layout/app-shell';
import { useToast } from '../../../../components/ui/toast-context';
import { MARKET_PRODUCTS, MarketProduct } from '../../../../lib/qalqan-data';

interface CartItem {
  product: MarketProduct;
  quantity: number;
}

const fallbackImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
const formatMoney = (value: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value);

export function ProductDetailClient({ slug }: { slug: string }) {
  const product = useMemo(() => MARKET_PRODUCTS.find((item) => item.slug === slug) ?? null, [slug]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { showToast } = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('qalqan-cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedFavs = localStorage.getItem('qalqan-favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!product) return;
    setSelectedVariant(product.variants[0]?.name ?? '');
    setSelectedImage(product.images[0] ?? fallbackImage);
  }, [product]);

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem('qalqan-cart', JSON.stringify(items));
  };

  const saveFavorites = (favs: string[]) => {
    setFavorites(favs);
    localStorage.setItem('qalqan-favorites', JSON.stringify(favs));
  };

  const addToCart = (item: MarketProduct) => {
    const existing = cart.find((entry) => entry.product.id === item.id);
    const updated = existing
      ? cart.map((entry) => (entry.product.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry))
      : [...cart, { product: item, quantity: 1 }];

    saveCart(updated);
    showToast(`Товар «${item.name}» добавлен в корзину`);
  };

  const toggleFavorite = (productId: string) => {
    const isFav = favorites.includes(productId);
    const updated = isFav ? favorites.filter((id) => id !== productId) : [...favorites, productId];
    saveFavorites(updated);
    showToast(isFav ? 'Удалено из избранного' : 'Добавлено в избранное');
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return MARKET_PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <AppShell
        eyebrow="Каталог"
        heading="Товар не найден"
        subheading="Такого товара нет в текущем каталоге QALQAN Market."
      >
        <div className="card" style={{ maxWidth: '720px', padding: '24px' }}>
          <Link href="/market" className="button button-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} />
            Вернуться в каталог
          </Link>
        </div>
      </AppShell>
    );
  }

  const variantInfo = product.variants.find((variant) => variant.name === selectedVariant) ?? product.variants[0] ?? { name: 'Базовая версия', price: product.price };
  const currentPrice = variantInfo.price;
  const isFav = favorites.includes(product.id);

  return (
    <AppShell
      eyebrow={product.brand}
      heading={product.name}
      subheading={product.model}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
        <Link href="/market" className="button button-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} />
          Назад в каталог
        </Link>
        <button onClick={() => toggleFavorite(product.id)} className="button button-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={16} fill={isFav ? 'var(--gold)' : 'none'} />
          {isFav ? 'В избранном' : 'В избранное'}
        </button>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card" style={{ padding: '18px' }}>
          <img
            src={selectedImage || product.images[0] || fallbackImage}
            alt={product.name}
            style={{ width: '100%', height: '520px', objectFit: 'cover', borderRadius: '16px', background: 'var(--surface-hover)' }}
            onError={(event) => {
              const target = event.currentTarget as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px', marginTop: '14px' }}>
            {product.images.map((image, index) => (
              <button
                key={`${product.id}-${index}`}
                onClick={() => setSelectedImage(image)}
                style={{
                  border: selectedImage === image ? '2px solid var(--gold)' : '1px solid var(--line)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  padding: 0,
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                <img src={image} alt={`${product.name} photo ${index + 1}`} style={{ width: '100%', height: '90px', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
            <div className="badge badge-gold">{product.badge ?? product.availability}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold)', fontSize: '14px' }}>
              <Star size={14} fill="var(--gold)" />
              <span>{product.rating}</span>
              <span style={{ color: 'var(--muted)' }}>({product.reviewsCount} отзывов)</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
            <strong style={{ fontSize: '32px', color: 'var(--gold)' }}>{formatMoney(currentPrice)} ₸</strong>
            {product.oldPrice ? <span style={{ color: 'var(--muted)', textDecoration: 'line-through' }}>{formatMoney(product.oldPrice)} ₸</span> : null}
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7, marginBottom: '18px' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '13px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--gold)' }} />
              Оригинальная гарантия
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '13px' }}>
              <Truck size={16} style={{ color: 'var(--gold)' }} />
              {product.availability}
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>Варианты</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.variants.map((variant) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(variant.name)}
                  className={`${selectedVariant === variant.name ? 'button button-primary' : 'button button-secondary'} button-sm`}
                  style={{ fontSize: '12px' }}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
            <button onClick={() => addToCart(product)} className="button button-primary" style={{ flex: 1 }}>
              <ShoppingBag size={16} />
              Добавить в корзину
            </button>
          </div>

          <div style={{ paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'grid', gap: '8px' }}>
            {product.details.map((detail) => (
              <div key={detail.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '14px' }}>
                <span style={{ color: 'var(--muted)' }}>{detail.label}</span>
                <strong style={{ textAlign: 'right' }}>{detail.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '28px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '24px' }}>Описание</h3>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '18px' }}>{product.description}</p>

          <div style={{ display: 'grid', gap: '10px' }}>
            <h4 style={{ margin: '0', fontSize: '18px' }}>Характеристики</h4>
            {product.specs.map((spec) => (
              <div key={spec.label} style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>{spec.label}</span>
                <strong style={{ textAlign: 'right' }}>{spec.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '24px' }}>Что входит в комплект</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {product.packageIncludes.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)' }}>
                <Check size={16} style={{ color: 'var(--gold)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '18px' }}>Отзывы</h4>
            <div style={{ display: 'grid', gap: '12px' }}>
              {product.reviews.slice(0, 3).map((review) => (
                <div key={`${review.user}-${review.title}`} style={{ padding: '12px', border: '1px solid var(--line)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <strong>{review.user}</strong>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold)' }}>
                      <Star size={12} fill="var(--gold)" />
                      {review.rating}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: '6px' }}>{review.title}</div>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '28px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '24px' }}>Похожие товары</h3>
          <div className="grid-4">
            {relatedProducts.map((related) => (
              <div key={related.id} className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href={`/market/product/${related.slug}`}>
                  <img
                    src={related.images[0] || fallbackImage}
                    alt={related.name}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
                    onError={(event) => {
                      const target = event.currentTarget as HTMLImageElement;
                      target.src = fallbackImage;
                    }}
                  />
                </Link>
                <div>
                  <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '4px' }}>{related.brand}</div>
                  <Link href={`/market/product/${related.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <strong>{related.name}</strong>
                  </Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{formatMoney(related.price)} ₸</span>
                  <button onClick={() => addToCart(related)} className="button button-primary button-sm">
                    <Plus size={14} />
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
