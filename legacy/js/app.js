const STORAGE_KEY = 'ilyas_bank_state_v2';

const serviceRoutes = [
  { route: 'transfers', title: 'Переводы', icon: '↗', text: 'По телефону, карте или между счетами' },
  { route: 'payments', title: 'Платежи', icon: '₸', text: 'Коммуналка, связь, штрафы и подписки' },
  { route: 'cards', title: 'Карты', icon: '▣', text: 'Оформление, лимиты и блокировка' },
  { route: 'credits', title: 'Кредиты', icon: '%', text: 'Калькулятор, график и погашение' },
  { route: 'deposits', title: 'Депозиты', icon: '+', text: 'Накопления и прогноз дохода' },
  { route: 'qr', title: 'QR', icon: '⌗', text: 'Демо-оплата по QR' },
  { route: 'history', title: 'История', icon: '≡', text: 'Фильтры, поиск и выписка' },
  { route: 'support', title: 'Поддержка', icon: '?', text: 'FAQ, чат и обращение' }
];

const navItems = [
  { route: 'home', label: 'Главная' },
  { route: 'dashboard', label: 'Кабинет', auth: true },
  { route: 'payments', label: 'Платежи' },
  { route: 'transfers', label: 'Переводы' },
  { route: 'cards', label: 'Карты' },
  { route: 'credits', label: 'Кредиты' },
  { route: 'deposits', label: 'Депозиты' },
  { route: 'support', label: 'Поддержка' },
  { route: 'profile', label: 'Профиль', auth: true }
];

const defaultState = () => ({
  session: null,
  users: {},
  transactions: [],
  supportMessages: [{ from: 'bank', text: 'Здравствуйте! Чем помочь?' }]
});

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState(), ...saved } : defaultState();
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function money(value) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(Number(value) || 0)) + ' ₸';
}

function currentUser() {
  return state.session ? state.users[state.session.email] : null;
}

function requireUser() {
  const user = currentUser();
  if (!user) {
    toast('Войдите или создайте аккаунт', 'error');
    location.hash = 'login';
    return null;
  }
  return user;
}

function ensureUser(email, name = 'Клиент ILYAS') {
  const normalized = email.toLowerCase().trim();
  if (!state.users[normalized]) {
    state.users[normalized] = {
      id: 'u_' + Date.now(),
      name,
      email: normalized,
      phone: '+7 700 000 0000',
      password: 'Test1234!',
      balance: 500000,
      cards: [{
        id: 'card_main',
        name: 'Everyday',
        number: '4400 82•• •••• 4821',
        raw: '4400820000004821',
        status: 'ACTIVE',
        limit: 250000,
        type: 'Дебетовая'
      }],
      credit: null,
      deposit: null,
      notifications: ['Демо-режим активен', 'Переводы внутри ILYAS BANK без комиссии']
    };
  }
  return state.users[normalized];
}

function addTransaction(type, title, amount, details = {}) {
  const user = currentUser();
  const tx = {
    id: 'tx_' + Date.now() + '_' + Math.random().toString(16).slice(2),
    userEmail: user?.email || null,
    type,
    title,
    amount: Number(amount) || 0,
    status: details.status || 'SUCCESS',
    direction: details.direction || 'out',
    createdAt: new Date().toISOString(),
    meta: details.meta || {}
  };
  state.transactions.unshift(tx);
  saveState();
  return tx;
}

function userTransactions(limit = null) {
  const user = currentUser();
  const txs = state.transactions.filter(tx => tx.userEmail === user?.email);
  return limit ? txs.slice(0, limit) : txs;
}

function setBalance(user, nextBalance) {
  user.balance = Math.max(0, Number(nextBalance) || 0);
}

function toast(message, type = 'info') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const node = document.createElement('div');
  node.className = `toast ${type}`;
  node.textContent = message;
  wrap.appendChild(node);
  setTimeout(() => node.remove(), 3600);
}

function go(route) {
  location.hash = route;
}

function routeName() {
  return (location.hash || '#home').replace('#', '') || 'home';
}

function pageTitle(route) {
  const item = navItems.find(x => x.route === route) || serviceRoutes.find(x => x.route === route);
  return item ? item.label || item.title : 'Главная';
}

function render() {
  const route = routeName();
  const user = currentUser();
  document.title = `${pageTitle(route)} - ILYAS BANK`;
  document.getElementById('app').innerHTML = `
    <div class="app-shell">
      ${renderHeader(route, user)}
      <main class="main">${renderRoute(route)}</main>
      ${renderBottomNav(route)}
    </div>
  `;
  bindRoute(route);
}

function renderHeader(route, user) {
  const visibleNav = navItems.filter(item => !item.auth || user);
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="#home" class="brand" aria-label="ILYAS BANK">
          <span class="brand-mark">I</span>
          <span>ILYAS BANK</span>
        </a>
        <nav class="desktop-nav">
          ${visibleNav.map(item => `<a class="nav-link ${route === item.route ? 'active' : ''}" href="#${item.route}">${item.label}</a>`).join('')}
        </nav>
        <div class="top-actions">
          ${user ? `<div class="user-chip">${escapeHTML(user.name)} · ${money(user.balance)}</div><button class="btn btn-outline" data-action="logout">Выйти</button>` : `<a class="btn btn-outline" href="#login">Войти</a><a class="btn btn-primary" href="#register">Создать аккаунт</a>`}
        </div>
      </div>
    </header>
  `;
}

function renderBottomNav(route) {
  const items = [
    { route: 'home', label: 'Дом' },
    { route: 'payments', label: 'Платежи' },
    { route: 'transfers', label: 'Переводы' },
    { route: 'dashboard', label: 'Кабинет' },
    { route: 'support', label: 'Помощь' }
  ];
  return `<nav class="bottom-nav">${items.map(item => `<a class="nav-link ${route === item.route ? 'active' : ''}" href="#${item.route}">${item.label}</a>`).join('')}</nav>`;
}

function renderRoute(route) {
  if (route === 'login') return renderAuth('login');
  if (route === 'register') return renderAuth('register');
  if (route === 'dashboard') return renderDashboard();
  if (route === 'transfers') return renderTransfers();
  if (route === 'payments') return renderPayments();
  if (route === 'cards') return renderCards();
  if (route === 'credits') return renderCredits();
  if (route === 'deposits') return renderDeposits();
  if (route === 'qr') return renderQR();
  if (route === 'history') return renderHistory();
  if (route === 'profile') return renderProfile();
  if (route === 'support') return renderSupport();
  return currentUser() ? renderDashboard() : renderHome();
}

function renderHome() {
  return `
    <section class="page">
      <div class="hero">
        <div class="hero-panel">
          <span class="eyebrow">Финтех для Казахстана</span>
          <h1>Банк, который сразу под рукой</h1>
          <p class="lead">Платежи, переводы, карты, кредиты, депозиты и QR-оплата в одном понятном демо-приложении.</p>
          <div class="btn-row">
            <a class="btn btn-primary" href="#register">Создать аккаунт</a>
            <a class="btn btn-outline" href="#login">Войти</a>
          </div>
        </div>
        <div class="hero-card card">
          <div class="card-row"><strong>ILYAS Everyday</strong><span>VIRTUAL</span></div>
          <div class="bank-card-visual">
            <div class="card-row"><span>ILYAS BANK</span><span class="chip"></span></div>
            <div><div style="font-size:24px;font-weight:850;">500 000 ₸</div><div>•••• 4821</div></div>
          </div>
        </div>
      </div>
      <section class="section grid grid-4">${renderServiceCards()}</section>
      <section class="section grid grid-3">
        ${infoCard('Без комиссии', 'Переводы внутри демо-банка проходят без комиссии.')}
        ${infoCard('Быстро', 'Все действия подтверждаются сразу и попадают в историю.')}
        ${infoCard('Безопасно', 'Пользовательский ввод экранируется, данные хранятся локально.')}
      </section>
    </section>
  `;
}

function renderServiceCards() {
  return serviceRoutes.map(item => `
    <article class="card service-card" onclick="go('${item.route}')">
      <div>
        <div class="service-icon">${item.icon}</div>
        <h3>${item.title}</h3>
        <p class="muted">${item.text}</p>
      </div>
    </article>
  `).join('');
}

function infoCard(title, text) {
  return `<article class="card"><h3>${title}</h3><p class="muted">${text}</p></article>`;
}

function field(name, label, type = 'text', placeholder = '', value = '') {
  return `<div class="field"><label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}" placeholder="${placeholder}" value="${escapeHTML(value)}" required></div>`;
}

function selectField(name, label, options) {
  return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}">${options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}</select></div>`;
}

function renderAuth(mode) {
  const isLogin = mode === 'login';
  return `
    <section class="page grid grid-2">
      <div class="hero-panel">
        <span class="eyebrow">Демо-доступ</span>
        <h1>${isLogin ? 'Вход' : 'Регистрация'}</h1>
        <p class="lead">Для входа используйте любой email и пароль <strong>Test1234!</strong>. Все данные сохраняются только в браузере.</p>
      </div>
      <form class="card form" id="auth-form">
        ${!isLogin ? field('name', 'Имя', 'text', 'Ильяс') : ''}
        ${!isLogin ? field('phone', 'Телефон', 'tel', '+7 700 000 0000') : ''}
        ${field('email', 'Email', 'email', 'user@example.com')}
        ${field('password', 'Пароль', 'password', 'Test1234!')}
        <button class="btn btn-primary" type="submit">${isLogin ? 'Войти' : 'Создать аккаунт'}</button>
        <a class="btn btn-outline" href="#${isLogin ? 'register' : 'login'}">${isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт'}</a>
      </form>
    </section>
  `;
}

function renderDashboard() {
  const user = requireUser();
  if (!user) return '';
  return `
    <section class="page">
      <div class="grid grid-2">
        <div class="card">
          <p class="muted">Доступный баланс</p>
          <div class="amount">${money(user.balance)}</div>
          <div class="btn-row" style="margin-top:18px;">
            <a class="btn btn-primary" href="#payments">Оплатить</a>
            <a class="btn btn-outline" href="#transfers">Перевести</a>
            <a class="btn btn-outline" href="#profile">Профиль</a>
          </div>
        </div>
        <div class="bank-card-visual">
          <div class="card-row"><strong>${escapeHTML(user.cards[0]?.name || 'Everyday')}</strong><span class="chip"></span></div>
          <div>
            <div>${escapeHTML(user.cards[0]?.number || '•••• 4821')}</div>
            <div style="color:rgba(255,255,255,0.72);">${escapeHTML(user.name)}</div>
          </div>
        </div>
      </div>
      <section class="section grid grid-4">${renderServiceCards()}</section>
      <section class="section grid grid-2">
        <div class="card">
          <h2>Последние операции</h2>
          ${renderTxList(userTransactions(5))}
        </div>
        <div class="card">
          <h2>Уведомления</h2>
          <div class="list">${user.notifications.map(item => `<div class="list-item"><span>${escapeHTML(item)}</span></div>`).join('')}</div>
          ${user.credit ? `<div class="stat"><span>Активный кредит</span><strong>${money(user.credit.remaining)}</strong></div>` : ''}
          ${user.deposit ? `<div class="stat"><span>Депозит</span><strong>${money(user.deposit.amount)}</strong></div>` : ''}
        </div>
      </section>
    </section>
  `;
}

function renderTransfers() {
  const user = requireUser();
  if (!user) return '';
  return `
    <section class="page grid grid-2">
      <div class="card">
        <h2>Переводы</h2>
        <div class="tabs" data-tabs="transferType">
          ${tab('phone', 'По телефону', true)}${tab('card', 'На карту')}${tab('self', 'Между счетами')}
        </div>
        <form class="form" id="transfer-form">
          ${field('recipient', 'Получатель', 'text', '+7 700 111 2233')}
          ${field('amount', 'Сумма', 'number', '10000')}
          ${field('comment', 'Комментарий', 'text', 'Перевод')}
          <button class="btn btn-primary" type="submit">Отправить</button>
        </form>
      </div>
      <div class="card">
        <h2>Последние переводы</h2>
        ${renderTxList(userTransactions().filter(tx => tx.type === 'TRANSFER').slice(0, 6))}
      </div>
    </section>
  `;
}

function renderPayments() {
  const user = requireUser();
  if (!user) return '';
  const services = [
    { value: 'Коммунальные услуги', label: 'Коммунальные услуги' },
    { value: 'Мобильная связь', label: 'Мобильная связь' },
    { value: 'Интернет', label: 'Интернет' },
    { value: 'Штрафы', label: 'Штрафы' },
    { value: 'Образование', label: 'Образование' },
    { value: 'Подписки', label: 'Подписки' }
  ];
  return `
    <section class="page">
      <h1>Платежи</h1>
      <div class="grid grid-2">
        <form class="card form" id="payment-form">
          ${selectField('service', 'Услуга', services)}
          ${field('account', 'Номер счета или телефона', 'text', '77001112233')}
          ${field('amount', 'Сумма', 'number', '7500')}
          <button class="btn btn-primary" type="submit">Оплатить</button>
        </form>
        <div class="card">
          <h2>Популярное</h2>
          <div class="grid grid-2">
            ${services.map(s => `<button class="btn btn-outline" data-fill-service="${s.value}">${s.label}</button>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCards() {
  const user = requireUser();
  if (!user) return '';
  const variants = [
    ['Everyday', '0 ₸', 'Платежи и переводы каждый день'],
    ['Travel', '990 ₸/мес', 'Для поездок и снятия наличных'],
    ['Premium', '2 990 ₸/мес', 'Повышенные лимиты и приоритет']
  ];
  return `
    <section class="page">
      <h1>Карты</h1>
      <div class="grid grid-3">
        ${variants.map(v => `<article class="card">
          <div class="bank-card-visual"><div class="card-row"><strong>${v[0]}</strong><span class="chip"></span></div><div>•••• ${Math.floor(1000 + Math.random() * 8999)}</div></div>
          <h3 style="margin-top:16px;">${v[0]}</h3><p class="muted">${v[2]}</p><strong>${v[1]}</strong>
          <button class="btn btn-primary" style="margin-top:14px;" data-issue-card="${v[0]}">Оформить</button>
        </article>`).join('')}
      </div>
      <section class="section card">
        <h2>Мои карты</h2>
        <div class="list">${user.cards.map(card => renderCardRow(card)).join('')}</div>
      </section>
    </section>
  `;
}

function renderCardRow(card) {
  return `<div class="list-item">
    <div><strong>${escapeHTML(card.name)}</strong><p class="muted">${escapeHTML(card.number)} · лимит ${money(card.limit)}</p></div>
    <span class="badge ${card.status === 'ACTIVE' ? 'success' : 'cancelled'}">${card.status === 'ACTIVE' ? 'Активна' : 'Заблокирована'}</span>
    <div class="btn-row">
      <button class="btn btn-outline" data-details-card="${card.id}">Реквизиты</button>
      <button class="btn btn-outline" data-limit-card="${card.id}">Лимит</button>
      <button class="btn ${card.status === 'ACTIVE' ? 'btn-danger' : 'btn-success'}" data-toggle-card="${card.id}">${card.status === 'ACTIVE' ? 'Заблокировать' : 'Разблокировать'}</button>
    </div>
  </div>`;
}

function renderCredits() {
  const user = requireUser();
  if (!user) return '';
  const credit = user.credit;
  return `
    <section class="page grid grid-2">
      <form class="card form" id="credit-form">
        <h2>Кредитный калькулятор</h2>
        ${field('creditAmount', 'Сумма', 'number', '500000')}
        ${selectField('creditTerm', 'Срок', [{value: '6', label: '6 месяцев · 8%'}, {value: '12', label: '12 месяцев · 10%'}, {value: '24', label: '24 месяца · 12%'}])}
        <div class="card" id="credit-result"></div>
        <button class="btn btn-primary" type="submit">Получить демо-кредит</button>
      </form>
      <div class="card">
        <h2>Активный кредит</h2>
        ${credit ? renderCreditDetails(credit) : '<div class="empty">Активного кредита нет</div>'}
      </div>
    </section>
  `;
}

function renderCreditDetails(credit) {
  return `
    <div class="stat"><span>Остаток</span><strong>${money(credit.remaining)}</strong></div>
    <div class="stat"><span>Платеж</span><strong>${money(credit.monthly)}</strong></div>
    <div class="stat"><span>Ставка</span><strong>${credit.rate}%</strong></div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn btn-primary" data-pay-credit>Погасить платеж</button>
      <button class="btn btn-outline" data-close-credit>Досрочно погасить</button>
    </div>
    <div class="table-wrap" style="margin-top:16px;"><table><thead><tr><th>Месяц</th><th>Платеж</th><th>Статус</th></tr></thead><tbody>
      ${credit.schedule.map(row => `<tr><td>${row.month}</td><td>${money(row.payment)}</td><td>${row.paid ? 'Оплачен' : 'Ожидает'}</td></tr>`).join('')}
    </tbody></table></div>
  `;
}

function renderDeposits() {
  const user = requireUser();
  if (!user) return '';
  const deposit = user.deposit;
  return `
    <section class="page grid grid-2">
      <form class="card form" id="deposit-form">
        <h2>Депозит</h2>
        ${field('depositAmount', 'Сумма', 'number', '200000')}
        ${selectField('depositTerm', 'Срок', [{value: '3', label: '3 месяца · 11%'}, {value: '6', label: '6 месяцев · 13%'}, {value: '12', label: '12 месяцев · 15%'}])}
        <div class="card" id="deposit-result"></div>
        <button class="btn btn-primary" type="submit">Открыть депозит</button>
      </form>
      <div class="card">
        <h2>Мой депозит</h2>
        ${deposit ? `<div class="stat"><span>Сумма</span><strong>${money(deposit.amount)}</strong></div><div class="stat"><span>Прогноз дохода</span><strong>${money(deposit.profit)}</strong></div><button class="btn btn-primary" style="margin-top:16px;" data-topup-deposit>Пополнить на 50 000 ₸</button>` : '<div class="empty">Депозит еще не открыт</div>'}
      </div>
    </section>
  `;
}

function renderQR() {
  const user = requireUser();
  if (!user) return '';
  return `
    <section class="page grid grid-2">
      <form class="card form" id="qr-form">
        <h2>QR-оплата</h2>
        ${field('qrAmount', 'Сумма', 'number', '3500')}
        ${field('qrPurpose', 'Назначение', 'text', 'Кофе и завтрак')}
        <button class="btn btn-primary" type="submit">Подтвердить оплату</button>
      </form>
      <div class="card">
        <h2>Демо QR</h2>
        <div class="qr-box">${Array.from({length: 81}, (_, i) => `<span class="qr-cell ${[1,3,8,10,14,20,25,33,37,44,51,58,63,70,77].includes(i) || i % 5 === 0 ? '' : 'empty'}"></span>`).join('')}</div>
      </div>
    </section>
  `;
}

function renderHistory() {
  const user = requireUser();
  if (!user) return '';
  return `
    <section class="page">
      <div class="card form">
        <h1>История операций</h1>
        <div class="grid grid-3">
          ${field('historySearch', 'Поиск', 'text', 'Перевод')}
          ${selectField('historyType', 'Тип', [{value:'',label:'Все'}, {value:'PAYMENT',label:'Платежи'}, {value:'TRANSFER',label:'Переводы'}, {value:'CREDIT',label:'Кредиты'}, {value:'CARD',label:'Карты'}, {value:'DEPOSIT',label:'Депозиты'}])}
          ${selectField('historyStatus', 'Статус', [{value:'',label:'Все'}, {value:'SUCCESS',label:'Успешно'}, {value:'PENDING',label:'Ожидает'}, {value:'CANCELLED',label:'Отменено'}])}
        </div>
        <button class="btn btn-outline" id="export-history">Скачать демо-выписку</button>
      </div>
      <section class="section card" id="history-list">${renderTxList(userTransactions())}</section>
    </section>
  `;
}

function renderProfile() {
  const user = requireUser();
  if (!user) return '';
  return `
    <section class="page grid grid-2">
      <form class="card form" id="profile-form">
        <h2>Профиль</h2>
        ${field('profileName', 'Имя', 'text', '', user.name)}
        ${field('profilePhone', 'Телефон', 'tel', '', user.phone)}
        ${field('profileEmail', 'Email', 'email', '', user.email)}
        <button class="btn btn-primary" type="submit">Сохранить</button>
      </form>
      <form class="card form" id="password-form">
        <h2>Безопасность</h2>
        ${field('oldPassword', 'Текущий пароль', 'password', 'Test1234!')}
        ${field('newPassword', 'Новый пароль', 'password', 'Newpass123!')}
        <button class="btn btn-outline" type="submit">Сменить пароль</button>
        <button class="btn btn-danger" type="button" data-action="logout">Выйти</button>
      </form>
    </section>
  `;
}

function renderSupport() {
  const faqs = ['Как восстановить доступ?', 'Как заблокировать карту?', 'Где посмотреть выписку?', 'Как погасить кредит?'];
  return `
    <section class="page grid grid-2">
      <div class="card">
        <h2>Поддержка</h2>
        <div class="list">${faqs.map(q => `<div class="list-item"><strong>${q}</strong><span class="muted">Ответ в демо-чате</span></div>`).join('')}</div>
        <div class="stat"><span>Телефон</span><strong>5555</strong></div>
        <div class="stat"><span>Email</span><strong>support@ilyas.bank</strong></div>
      </div>
      <div class="card">
        <h2>Чат</h2>
        <div class="chat-box" id="chat-box">${state.supportMessages.map(m => `<div class="message ${m.from === 'me' ? 'me' : ''}">${escapeHTML(m.text)}</div>`).join('')}</div>
        <form class="form" id="chat-form" style="margin-top:14px;">
          ${field('chatText', 'Сообщение', 'text', 'Нужна помощь')}
          <button class="btn btn-primary" type="submit">Отправить</button>
        </form>
      </div>
    </section>
  `;
}

function tab(value, label, active = false) {
  return `<button class="tab ${active ? 'active' : ''}" type="button" data-tab="${value}">${label}</button>`;
}

function renderTxList(txs) {
  if (!txs.length) return '<div class="empty">Операций пока нет</div>';
  return `<div class="list">${txs.map(tx => `
    <div class="list-item">
      <div><strong>${escapeHTML(tx.title)}</strong><p class="muted">${new Date(tx.createdAt).toLocaleString('ru-RU')}</p></div>
      <strong class="${tx.direction === 'in' ? 'success' : ''}">${tx.direction === 'in' ? '+' : '-'}${money(tx.amount)}</strong>
      <span class="badge ${tx.status === 'SUCCESS' ? 'success' : tx.status === 'PENDING' ? 'pending' : 'cancelled'}">${statusLabel(tx.status)}</span>
    </div>
  `).join('')}</div>`;
}

function statusLabel(status) {
  return { SUCCESS: 'Успешно', PENDING: 'Ожидает', CANCELLED: 'Отменено' }[status] || status;
}

function bindRoute(route) {
  document.querySelectorAll('[data-action="logout"]').forEach(btn => btn.addEventListener('click', logout));
  if (route === 'login' || route === 'register') bindAuth(route);
  if (route === 'transfers') bindTransfers();
  if (route === 'payments') bindPayments();
  if (route === 'cards') bindCards();
  if (route === 'credits') bindCredits();
  if (route === 'deposits') bindDeposits();
  if (route === 'qr') bindQR();
  if (route === 'history') bindHistory();
  if (route === 'profile') bindProfile();
  if (route === 'support') bindSupport();
}

function bindAuth(route) {
  document.getElementById('auth-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return toast('Введите корректный email', 'error');
    if (String(data.password).length < 8) return toast('Пароль должен быть от 8 символов', 'error');
    if (route === 'login' && data.password !== 'Test1234!' && ensureUser(data.email).password !== data.password) {
      return toast('Для демо используйте Test1234!', 'error');
    }
    const user = ensureUser(data.email, data.name || 'Клиент ILYAS');
    if (route === 'register') {
      user.name = escapeHTML(data.name || user.name);
      user.phone = escapeHTML(data.phone || user.phone);
      user.password = data.password;
    }
    state.session = { email: user.email };
    saveState();
    toast(route === 'login' ? 'Вы вошли' : 'Аккаунт создан', 'success');
    go('dashboard');
  });
}

function logout() {
  state.session = null;
  saveState();
  toast('Вы вышли из аккаунта', 'info');
  go('home');
  render();
}

function bindTransfers() {
  let transferType = 'phone';
  document.querySelectorAll('[data-tab]').forEach(tab => tab.addEventListener('click', () => {
    transferType = tab.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach(t => t.classList.toggle('active', t === tab));
    document.querySelector('label[for="recipient"]').textContent = transferType === 'card' ? 'Номер карты' : transferType === 'self' ? 'Свой счет' : 'Получатель';
  }));
  document.getElementById('transfer-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = requireUser();
    if (!user) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const amount = Number(data.amount);
    if (!amount || amount < 100) return toast('Минимальная сумма 100 ₸', 'error');
    if (amount > user.balance) return toast('Недостаточно средств', 'error');
    setBalance(user, user.balance - amount);
    addTransaction('TRANSFER', `Перевод: ${escapeHTML(data.recipient)}`, amount, { meta: { transferType, comment: data.comment } });
    saveState();
    toast('Перевод выполнен', 'success');
    render();
  });
}

function bindPayments() {
  document.querySelectorAll('[data-fill-service]').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById('service').value = btn.dataset.fillService;
  }));
  document.getElementById('payment-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = requireUser();
    if (!user) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const amount = Number(data.amount);
    if (!amount || amount < 100) return toast('Введите сумму от 100 ₸', 'error');
    if (amount > user.balance) return toast('Недостаточно средств', 'error');
    setBalance(user, user.balance - amount);
    addTransaction('PAYMENT', `${data.service}: ${escapeHTML(data.account)}`, amount);
    saveState();
    toast('Платеж выполнен', 'success');
    render();
  });
}

function bindCards() {
  const user = requireUser();
  if (!user) return;
  document.querySelectorAll('[data-issue-card]').forEach(btn => btn.addEventListener('click', () => {
    const name = btn.dataset.issueCard;
    const suffix = String(Math.floor(1000 + Math.random() * 8999));
    user.cards.push({ id: 'card_' + Date.now(), name, number: `4400 82•• •••• ${suffix}`, raw: '440082000000' + suffix, status: 'ACTIVE', limit: 200000, type: 'Дебетовая' });
    addTransaction('CARD', `Оформлена карта ${name}`, 0, { direction: 'in' });
    saveState();
    toast('Карта оформлена', 'success');
    render();
  }));
  document.querySelectorAll('[data-toggle-card]').forEach(btn => btn.addEventListener('click', () => {
    const card = user.cards.find(c => c.id === btn.dataset.toggleCard);
    card.status = card.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    saveState();
    toast(card.status === 'ACTIVE' ? 'Карта разблокирована' : 'Карта заблокирована', 'info');
    render();
  }));
  document.querySelectorAll('[data-limit-card]').forEach(btn => btn.addEventListener('click', () => {
    const card = user.cards.find(c => c.id === btn.dataset.limitCard);
    const next = Number(prompt('Новый лимит', card.limit));
    if (next > 0) {
      card.limit = next;
      saveState();
      toast('Лимит обновлен', 'success');
      render();
    }
  }));
  document.querySelectorAll('[data-details-card]').forEach(btn => btn.addEventListener('click', () => {
    const card = user.cards.find(c => c.id === btn.dataset.detailsCard);
    alert(`Карта: ${card.name}\nНомер: ${card.raw.replace(/(.{4})/g, '$1 ').trim()}\nCVC: •••\nСрок: 12/29`);
  }));
}

function calcCredit(amount, term) {
  const rates = { 6: 8, 12: 10, 24: 12 };
  const rate = rates[term] || 10;
  const total = amount + amount * (rate / 100) * (term / 12);
  return { rate, total, monthly: Math.ceil(total / term) };
}

function bindCredits() {
  const amount = document.getElementById('creditAmount');
  const term = document.getElementById('creditTerm');
  const result = document.getElementById('credit-result');
  const update = () => {
    const calc = calcCredit(Number(amount.value), Number(term.value));
    result.innerHTML = `<div class="stat"><span>Ежемесячно</span><strong>${money(calc.monthly)}</strong></div><div class="stat"><span>Всего</span><strong>${money(calc.total)}</strong></div>`;
  };
  amount?.addEventListener('input', update);
  term?.addEventListener('change', update);
  update();
  document.getElementById('credit-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = requireUser();
    if (!user) return;
    const a = Number(amount.value);
    const t = Number(term.value);
    if (a < 50000 || a > 5000000) return toast('Сумма кредита от 50 000 до 5 000 000 ₸', 'error');
    const calc = calcCredit(a, t);
    user.credit = { amount: a, remaining: calc.total, term: t, rate: calc.rate, monthly: calc.monthly, schedule: Array.from({ length: t }, (_, i) => ({ month: i + 1, payment: calc.monthly, paid: false })) };
    setBalance(user, user.balance + a);
    addTransaction('CREDIT', 'Получен демо-кредит', a, { direction: 'in' });
    saveState();
    toast('Кредит выдан', 'success');
    render();
  });
  document.querySelector('[data-pay-credit]')?.addEventListener('click', () => {
    const user = requireUser();
    const credit = user?.credit;
    if (!credit) return;
    if (user.balance < credit.monthly) return toast('Недостаточно средств', 'error');
    const next = credit.schedule.find(p => !p.paid);
    if (next) next.paid = true;
    setBalance(user, user.balance - credit.monthly);
    credit.remaining = Math.max(0, credit.remaining - credit.monthly);
    addTransaction('CREDIT', 'Платеж по кредиту', credit.monthly);
    if (credit.remaining <= 0) user.credit = null;
    saveState();
    toast('Платеж принят', 'success');
    render();
  });
  document.querySelector('[data-close-credit]')?.addEventListener('click', () => {
    const user = requireUser();
    const credit = user?.credit;
    if (!credit) return;
    if (user.balance < credit.remaining) return toast('Недостаточно средств', 'error');
    setBalance(user, user.balance - credit.remaining);
    addTransaction('CREDIT', 'Досрочное погашение кредита', credit.remaining);
    user.credit = null;
    saveState();
    toast('Кредит закрыт', 'success');
    render();
  });
}

function calcDeposit(amount, term) {
  const rates = { 3: 11, 6: 13, 12: 15 };
  const rate = rates[term] || 13;
  const profit = amount * (rate / 100) * (term / 12);
  return { rate, profit };
}

function bindDeposits() {
  const amount = document.getElementById('depositAmount');
  const term = document.getElementById('depositTerm');
  const result = document.getElementById('deposit-result');
  const update = () => {
    const calc = calcDeposit(Number(amount.value), Number(term.value));
    result.innerHTML = `<div class="stat"><span>Ставка</span><strong>${calc.rate}%</strong></div><div class="stat"><span>Доход</span><strong>${money(calc.profit)}</strong></div>`;
  };
  amount?.addEventListener('input', update);
  term?.addEventListener('change', update);
  update();
  document.getElementById('deposit-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = requireUser();
    const a = Number(amount.value);
    const t = Number(term.value);
    if (a < 10000) return toast('Минимальная сумма 10 000 ₸', 'error');
    if (a > user.balance) return toast('Недостаточно средств', 'error');
    const calc = calcDeposit(a, t);
    setBalance(user, user.balance - a);
    user.deposit = { amount: a, term: t, rate: calc.rate, profit: calc.profit, openedAt: new Date().toISOString() };
    addTransaction('DEPOSIT', 'Открыт депозит', a);
    saveState();
    toast('Депозит открыт', 'success');
    render();
  });
  document.querySelector('[data-topup-deposit]')?.addEventListener('click', () => {
    const user = requireUser();
    if (!user?.deposit) return;
    if (user.balance < 50000) return toast('Недостаточно средств', 'error');
    setBalance(user, user.balance - 50000);
    user.deposit.amount += 50000;
    user.deposit.profit = calcDeposit(user.deposit.amount, user.deposit.term).profit;
    addTransaction('DEPOSIT', 'Пополнение депозита', 50000);
    saveState();
    toast('Депозит пополнен', 'success');
    render();
  });
}

function bindQR() {
  document.getElementById('qr-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = requireUser();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const amount = Number(data.qrAmount);
    if (!amount || amount < 100) return toast('Введите сумму от 100 ₸', 'error');
    if (amount > user.balance) return toast('Недостаточно средств', 'error');
    setBalance(user, user.balance - amount);
    addTransaction('PAYMENT', `QR: ${escapeHTML(data.qrPurpose)}`, amount);
    saveState();
    toast('QR-оплата выполнена', 'success');
    render();
  });
}

function bindHistory() {
  const filter = () => {
    const q = document.getElementById('historySearch').value.toLowerCase();
    const type = document.getElementById('historyType').value;
    const status = document.getElementById('historyStatus').value;
    const txs = userTransactions().filter(tx => (!q || tx.title.toLowerCase().includes(q)) && (!type || tx.type === type) && (!status || tx.status === status));
    document.getElementById('history-list').innerHTML = renderTxList(txs);
  };
  ['historySearch', 'historyType', 'historyStatus'].forEach(id => document.getElementById(id)?.addEventListener('input', filter));
  document.getElementById('export-history')?.addEventListener('click', () => {
    const rows = userTransactions().map(tx => `${tx.createdAt};${tx.type};${tx.title};${tx.amount};${tx.status}`).join('\n');
    const blob = new Blob(['date;type;title;amount;status\n' + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ilyas-bank-statement.csv';
    link.click();
    URL.revokeObjectURL(url);
  });
}

function bindProfile() {
  document.getElementById('profile-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = requireUser();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    user.name = escapeHTML(data.profileName);
    user.phone = escapeHTML(data.profilePhone);
    saveState();
    toast('Профиль обновлен', 'success');
    render();
  });
  document.getElementById('password-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = requireUser();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.oldPassword !== user.password && data.oldPassword !== 'Test1234!') return toast('Текущий пароль неверный', 'error');
    if (String(data.newPassword).length < 8) return toast('Новый пароль слишком короткий', 'error');
    user.password = data.newPassword;
    saveState();
    toast('Пароль изменен', 'success');
  });
}

function bindSupport() {
  const box = document.getElementById('chat-box');
  if (box) box.scrollTop = box.scrollHeight;
  document.getElementById('chat-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!data.chatText.trim()) return;
    state.supportMessages.push({ from: 'me', text: data.chatText });
    state.supportMessages.push({ from: 'bank', text: 'Спасибо! Мы уже проверяем ваш вопрос в демо-чате.' });
    saveState();
    render();
  });
}

window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) location.hash = 'home';
  render();
});
