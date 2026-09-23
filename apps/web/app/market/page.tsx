'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Star,
  Heart,
  Plus,
  Minus,
  Trash2,
  X,
  ArrowRight,
} from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { MARKET_PRODUCTS, MarketProduct } from '../../lib/qalqan-data';
import { useToast } from '../../components/ui/toast-context';

interface CartItem {
  product: MarketProduct;
  quantity: number;
}

const fallbackImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
const formatMoney = (value: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value);

export default function MarketPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [recipient, setRecipient] = useState({
    name: 'Аян Сейітов',
    phone: '+7 (708) 555-01-24',
    pickupPoint: 'Главный корпус, кампус Академии, бокс 12'
  });
  const [demoOrderId, setDemoOrderId] = useState('QL-2026-00124');
  const { showToast } = useToast();

  const categories = ['Все', 'Ноутбуки', 'Смартфоны', 'Аксессуары', 'Учебные товары'];

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

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem('qalqan-cart', JSON.stringify(items));
  };

  const saveFavorites = (favs: string[]) => {
    setFavorites(favs);
    localStorage.setItem('qalqan-favorites', JSON.stringify(favs));
  };

  const addToCart = (product: MarketProduct) => {
    const existing = cart.find((i) => i.product.id === product.id);
    const updated = existing
      ? cart.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
      : [...cart, { product, quantity: 1 }];

    saveCart(updated);
    showToast(`Товар «${product.name}» добавлен в корзину`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter((i) => i.product.id !== productId));
  };

  const toggleFavorite = (productId: string) => {
    const isFav = favorites.includes(productId);
    const updated = isFav ? favorites.filter((id) => id !== productId) : [...favorites, productId];
    saveFavorites(updated);
    showToast(isFav ? 'Удалено из избранного' : 'Добавлено в избранное');
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);
  const totalCartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const filteredProducts = useMemo(() => {
    return MARKET_PRODUCTS.filter((product) => {
      const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
      const search = searchQuery.trim().toLowerCase();
      const textMatch =
        search.length === 0 ||
        product.name.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);

      return categoryMatch && textMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleFinishOrder = () => {
    const orderNumber = `QL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setDemoOrderId(orderNumber);
    setCheckoutStep(4);
    saveCart([]);
    showToast(`Заказ успешно создан № ${orderNumber}`);
  };

  return (
    <AppShell
      eyebrow="Официальный магазин Академии"
      heading="QALQAN Market"
      subheading="Реальный каталог для учёбы, работы, жизни и активного студенческого ритма."
      action={
        <button
          onClick={() => {
            setCheckoutStep(1);
            setIsCartOpen(true);
          }}
          className="button button-primary"
          id="market-cart-btn"
          style={{ position: 'relative' }}
        >
          <ShoppingBag size={18} />
          <span>Корзина</span>
          {totalCartCount > 0 && (
            <span
              style={{
                background: '#0B1422',
                color: 'var(--gold)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 800,
                marginLeft: '8px'
              }}
            >
              {totalCartCount}
            </span>
          )}
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        <div style={{ position: 'relative', maxWidth: '540px' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }}
          />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: '42px' }}
            placeholder="Поиск ноутбуков, смартфонов, аксессуаров и учебных товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="market-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`button button-sm ${selectedCategory === cat ? 'button-primary' : 'button-secondary'}`}
              style={{ fontSize: '13px', whiteSpace: 'nowrap' }}
              id={`market-cat-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-4" id="market-products-grid">
        {filteredProducts.map((product) => {
          const isFav = favorites.includes(product.id);
          return (
            <div
              key={product.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
              id={`product-${product.id}`}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-muted" style={{ fontSize: '11px' }}>
                    {product.category}
                  </span>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: isFav ? 'var(--gold)' : 'var(--muted)' }}
                    title={isFav ? 'В избранном' : 'Добавить в избранное'}
                    aria-label="Избранное"
                  >
                    <Heart size={18} fill={isFav ? 'var(--gold)' : 'none'} />
                  </button>
                </div>

                <Link href={`/market/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                  <img
                    src={product.images[0] || fallbackImage}
                    alt={product.name}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '14px', background: 'var(--surface-hover)' }}
                    onError={(event) => {
                      const target = event.currentTarget as HTMLImageElement;
                      target.src = fallbackImage;
                    }}
                  />
                </Link>

                <Link href={`/market/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3 }}>
                    {product.brand} {product.name}
                  </h3>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gold)', marginBottom: '8px' }}>
                  <Star size={13} fill="var(--gold)" />
                  <span>{product.rating}</span>
                  <span style={{ color: 'var(--muted)' }}>({product.reviewsCount} отзывов)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{product.availability}</span>
                  {product.badge && <span className="badge badge-gold" style={{ fontSize: '10px' }}>{product.badge}</span>}
                </div>

                <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5, marginBottom: '16px' }}>
                  {product.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--line)'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Цена</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <strong style={{ fontSize: '16px', color: 'var(--gold)' }}>
                      {formatMoney(product.price)} {product.currency}
                    </strong>
                    {product.oldPrice && (
                      <span style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>
                        {formatMoney(product.oldPrice)} {product.currency}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="button button-primary button-sm"
                  id={`add-to-cart-${product.id}`}
                >
                  <Plus size={14} />
                  <span>В корзину</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isCartOpen && (
        <div className="modal-backdrop" onClick={() => setIsCartOpen(false)} id="cart-modal-backdrop">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={20} style={{ color: 'var(--gold)' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
                  {checkoutStep === 1 && 'Корзина товаров'}
                  {checkoutStep === 2 && 'Шаг 2: Получатель'}
                  {checkoutStep === 3 && 'Шаг 3: Подтверждение'}
                  {checkoutStep === 4 && 'Заказ оформлен'}
                </h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="button button-ghost" style={{ padding: '4px', minHeight: 'auto' }}>
                <X size={18} />
              </button>
            </div>

            {checkoutStep < 4 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '12px', fontWeight: 600 }}>
                {['1. Корзина', '2. Получатель', '3. Подтверждение'].map((step, idx) => (
                  <span
                    key={step}
                    style={{
                      color: checkoutStep >= idx + 1 ? 'var(--gold)' : 'var(--muted)',
                      borderBottom: checkoutStep === idx + 1 ? '2px solid var(--gold)' : '2px solid transparent',
                      paddingBottom: '4px'
                    }}
                  >
                    {step}
                  </span>
                ))}
              </div>
            )}

            {checkoutStep === 1 && (
              <div>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--muted)' }}>
                    <ShoppingBag size={36} style={{ margin: '0 auto 12px', color: 'var(--gold)' }} />
                    <p>Ваша корзина пуста</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '50vh', overflowY: 'auto' }}>
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--surface-hover)',
                          gap: '12px'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.product.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--gold)', marginTop: '2px' }}>
                            {formatMoney(item.product.price)} ₸
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="button button-secondary" style={{ minHeight: '32px', minWidth: '32px', padding: 0 }}>
                            <Minus size={13} />
                          </button>
                          <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="button button-secondary" style={{ minHeight: '32px', minWidth: '32px', padding: 0 }}>
                            <Plus size={13} />
                          </button>
                          <button onClick={() => removeFromCart(item.product.id)} className="button button-ghost" style={{ minHeight: '32px', minWidth: '32px', padding: 0, color: 'var(--danger)' }} title="Удалить">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Итого к оплате:</span>
                      <strong style={{ fontSize: '20px', color: 'var(--gold)' }}>{formatMoney(cartTotal)} ₸</strong>
                    </div>
                    <button onClick={() => setCheckoutStep(2)} className="button button-primary" style={{ width: '100%' }} id="proceed-to-recipient-btn">
                      <span>Оформить заказ</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {checkoutStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>ФИО получателя</label>
                  <input type="text" className="input" value={recipient.name} onChange={(e) => setRecipient({ ...recipient, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Номер телефона</label>
                  <input type="text" className="input" value={recipient.phone} onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Пункт выдачи в Академии</label>
                  <input type="text" className="input" value={recipient.pickupPoint} onChange={(e) => setRecipient({ ...recipient, pickupPoint: e.target.value })} />
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button onClick={() => setCheckoutStep(1)} className="button button-secondary">Назад</button>
                  <button onClick={() => setCheckoutStep(3)} className="button button-primary">Подтвердить</button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="card" style={{ padding: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>Проверка заказа</div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div><strong>Получатель:</strong> {recipient.name}</div>
                    <div><strong>Телефон:</strong> {recipient.phone}</div>
                    <div><strong>Пункт выдачи:</strong> {recipient.pickupPoint}</div>
                    <div><strong>Итого:</strong> {formatMoney(cartTotal)} ₸</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button onClick={() => setCheckoutStep(2)} className="button button-secondary">Назад</button>
                  <button onClick={handleFinishOrder} className="button button-primary">Подтвердить оплату</button>
                </div>
              </div>
            )}

            {checkoutStep === 4 && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px 0 8px' }}>
                <div style={{ fontSize: '42px' }}>✅</div>
                <h3 style={{ fontSize: '22px', margin: 0 }}>Заказ оформлен</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Номер заказа: {demoOrderId}</p>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Заказ будет готов к выдаче в пункте {recipient.pickupPoint}</p>
                <button onClick={() => setIsCartOpen(false)} className="button button-primary" style={{ width: '100%' }}>Закрыть</button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
