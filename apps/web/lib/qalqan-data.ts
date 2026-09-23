export interface StudentProfile {
  name: string;
  id: string;
  qalqanId: string;
  specialty: string;
  course: string;
  group: string;
  faculty: string;
  gpa: number;
  attendance: number;
  nextClass: {
    subject: string;
    time: string;
    room: string;
    instructor: string;
  };
}

export const STUDENT_MOCK: StudentProfile = {
  name: 'Аян Сейітов',
  id: 'QL-2026-9941',
  qalqanId: 'QL-2026-9941',
  specialty: 'Информационная безопасность',
  course: '1 курс',
  group: 'IS-101',
  faculty: 'Факультет информационной безопасности и IT',
  gpa: 91.4,
  attendance: 94,
  nextClass: {
    subject: 'Информационная безопасность',
    time: 'Сегодня · 14:00',
    room: 'Аудитория 304',
    instructor: 'Ахметов Б. К., Ph.D.'
  }
};

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  type: 'Лекция' | 'Семинар' | 'Лабораторная';
  room: string;
  instructor: string;
}

export const SCHEDULE_MOCK: ScheduleItem[] = [
  { id: 's1', day: 'Понедельник', time: '09:00 - 10:20', subject: 'Математический анализ', type: 'Лекция', room: 'Ауд. 201', instructor: 'Омаров Т. С.' },
  { id: 's2', day: 'Понедельник', time: '10:40 - 12:00', subject: 'Информационные технологии', type: 'Лабораторная', room: 'IT Lab 2', instructor: 'Жусупов М. А.' },
  { id: 's3', day: 'Вторник', time: '14:00 - 15:20', subject: 'Информационная безопасность', type: 'Лекция', room: 'Ауд. 304', instructor: 'Ахметов Б. К.' },
  { id: 's4', day: 'Вторник', time: '15:40 - 17:00', subject: 'История Казахстана', type: 'Семинар', room: 'Ауд. 112', instructor: 'Касымова Д. Н.' },
  { id: 's5', day: 'Среда', time: '11:00 - 12:20', subject: 'Иностранный язык (Professional English)', type: 'Семинар', room: 'Ауд. 408', instructor: 'Смирнова Е. В.' },
  { id: 's6', day: 'Четверг', time: '09:00 - 10:20', subject: 'Информационная безопасность', type: 'Лабораторная', room: 'Security Lab 1', instructor: 'Ахметов Б. К.' },
  { id: 's7', day: 'Пятница', time: '10:00 - 11:30', subject: 'Физическая подготовка', type: 'Семинар', room: 'Спорткомплекс', instructor: 'Алиев С. М.' }
];

export interface AcademicGrade {
  subject: string;
  currentScore: number;
  midterm: number;
  total: number;
  gradeLetter: string;
  credits: number;
}

export const GRADES_MOCK: AcademicGrade[] = [
  { subject: 'История Казахстана', currentScore: 92, midterm: 96, total: 94.0, gradeLetter: 'A', credits: 3 },
  { subject: 'Математика', currentScore: 88, midterm: 91, total: 89.5, gradeLetter: 'B+', credits: 4 },
  { subject: 'Информационные технологии', currentScore: 95, midterm: 97, total: 96.0, gradeLetter: 'A', credits: 4 },
  { subject: 'Информационная безопасность', currentScore: 94, midterm: 93, total: 93.5, gradeLetter: 'A-', credits: 4 },
  { subject: 'Иностранный язык', currentScore: 90, midterm: 94, total: 92.0, gradeLetter: 'A-', credits: 3 },
  { subject: 'Физическая подготовка', currentScore: 96, midterm: 94, total: 95.0, gradeLetter: 'A', credits: 2 }
];

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Новое' | 'В работе' | 'Выполнено';
  score?: string;
}

export const ASSIGNMENTS_MOCK: Assignment[] = [
  { id: 'a1', title: 'Лабораторная работа №3: Анализ сетевых пакетов', subject: 'Информационная безопасность', dueDate: '25 сентября 2026', status: 'В работе' },
  { id: 'a2', title: 'Расчетная работа по дифференциальным уравнениям', subject: 'Математика', dueDate: '28 сентября 2026', status: 'Новое' },
  { id: 'a3', title: 'Эссе: «Этапы становления государственности Казахстана»', subject: 'История Казахстана', dueDate: '20 сентября 2026', status: 'Выполнено', score: '95/100' },
  { id: 'a4', title: 'Технический перевод научной статьи по криптографии', subject: 'Иностранный язык', dueDate: '18 сентября 2026', status: 'Выполнено', score: '92/100' }
];

export interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  format: 'Компьютерное тестирование' | 'Письменный экзамен' | 'Устный ответ';
}

export const EXAMS_MOCK: Exam[] = [
  { id: 'e1', subject: 'Математика', date: '22 декабря 2026', time: '10:00', room: 'Главный зал тестирования', format: 'Компьютерное тестирование' },
  { id: 'e2', subject: 'Информационная безопасность', date: '25 декабря 2026', time: '14:00', room: 'Ауд. 304', format: 'Письменный экзамен' },
  { id: 'e3', subject: 'История Казахстана', date: '28 декабря 2026', time: '09:30', room: 'Ауд. 112', format: 'Компьютерное тестирование' }
];

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  year: number;
  category: 'История Казахстана' | 'Право' | 'IT' | 'Информационная безопасность' | 'Математика' | 'Языки';
  description: string;
  pages: number;
  format: string;
  rating: number;
  cover: string;
}

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'b1',
    title: 'Абай жолы',
    author: 'Мұхтар Әуезов',
    year: 1948,
    category: 'История Казахстана',
    description: 'Классическое эпическое произведение о жизни и философии Абая, его духовном пути и общественных преобразованиях в XIX веке.',
    pages: 640,
    format: 'PDF / ePub',
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'b2',
    title: 'Қара сөздер',
    author: 'Абай Құнанбайұлы',
    year: 2020,
    category: 'История Казахстана',
    description: 'Сборник афоризмов и нравственных наставлений Абая, раскрывающих этику, образование, общество и внутреннюю мудрость.',
    pages: 320,
    format: 'PDF',
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'b3',
    title: 'Көшпенділер',
    author: 'Ілияс Есенберлин',
    year: 1958,
    category: 'История Казахстана',
    description: 'Историко-эпическое произведение о кочевом обществе, национальном характере и судьбе степных народов.',
    pages: 520,
    format: 'PDF / E-book',
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'b4',
    title: 'Информационное право Республики Казахстан',
    author: 'Сулейменов М. К.',
    year: 2024,
    category: 'Право',
    description: 'Правовые аспекты защиты персональных данных, регулирования критической информационной инфраструктуры и электронного документооборота.',
    pages: 328,
    format: 'PDF',
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'b5',
    title: 'Прикладная высшая математика для инженеров безопасности',
    author: 'Омаров Т. С., Кузнецов И. В.',
    year: 2023,
    category: 'Математика',
    description: 'Теория вероятностей, математическая статистика, элементы дискретной математики и линейной алгебры с прикладными примерами.',
    pages: 520,
    format: 'PDF',
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'b6',
    title: 'Academic English for Cybersecurity & Intelligence',
    author: 'Смирнова Е. В., Davis R.',
    year: 2024,
    category: 'Языки',
    description: 'Специализированный курс английского языка для IT-специалистов, исследователей и аналитиков цифровых систем.',
    pages: 290,
    format: 'PDF / Audio',
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80'
  }
];

export interface EgovService {
  id: string;
  category: 'Документы' | 'Налоги и платежи' | 'Справки' | 'Социальные услуги' | 'Здравоохранение';
  title: string;
  description: string;
  officialUrl: string;
  popularity: string;
}

export const EGOV_SERVICES: EgovService[] = [
  {
    id: 'eg1',
    category: 'Документы',
    title: 'Цифровые документы',
    description: 'Официальный доступ к электронному удостоверению личности, паспорту, водительским правам в приложении eGov Mobile.',
    officialUrl: 'https://egov.kz/cms/ru/services/pass_001',
    popularity: 'Высокая'
  },
  {
    id: 'eg2',
    category: 'Документы',
    title: 'Получение и замена удостоверения личности',
    description: 'Подача заявки на изготовление нового удостоверения личности при утере или по истечению срока.',
    officialUrl: 'https://egov.kz/cms/ru/services/pass_002',
    popularity: 'Высокая'
  },
  {
    id: 'eg3',
    category: 'Налоги и платежи',
    title: 'Проверка налоговой задолженности физических лиц',
    description: 'Сведения об имущественном, земельном и транспортном налогах, а также проверка пени.',
    officialUrl: 'https://egov.kz/cms/ru/services/tax_001',
    popularity: 'Часто запрашиваемое'
  },
  {
    id: 'eg4',
    category: 'Налоги и платежи',
    title: 'Проверка и оплата административных штрафов',
    description: 'Поиск штрафов за нарушения ПДД и предписаний органов правопорядка.',
    officialUrl: 'https://egov.kz/cms/ru/services/fine_001',
    popularity: 'Высокая'
  },
  {
    id: 'eg5',
    category: 'Справки',
    title: 'Справка о наличии либо отсутствии судимости',
    description: 'Электронная государственная справка с QR-кодом для предоставления по месту учебы или работы.',
    officialUrl: 'https://egov.kz/cms/ru/services/sud_001',
    popularity: 'Топ-1'
  },
  {
    id: 'eg6',
    category: 'Справки',
    title: 'Справка о несудимости с апостилем',
    description: 'Получение подтвержденного документа для международных программ обмена и стажировок.',
    officialUrl: 'https://egov.kz/cms/ru/services/sud_002',
    popularity: 'Средняя'
  },
  {
    id: 'eg7',
    category: 'Социальные услуги',
    title: 'Справка о пенсионных накоплениях (ЕНПФ)',
    description: 'Выписка о состоянии индивидуального пенсионного счета и обязательных пенсионных взносах.',
    officialUrl: 'https://egov.kz/cms/ru/services/enpf_001',
    popularity: 'Высокая'
  },
  {
    id: 'eg8',
    category: 'Здравоохранение',
    title: 'Прикрепление к поликлинике и статус в ОСМС',
    description: 'Проверка статуса в системе обязательного социального медицинского страхования и выбор медорганизации.',
    officialUrl: 'https://egov.kz/cms/ru/services/med_001',
    popularity: 'Высокая'
  }
];

export interface MarketProduct {
  id: string;
  slug: string;
  brand: string;
  name: string;
  model: string;
  category: 'Ноутбуки' | 'Смартфоны' | 'Аксессуары' | 'Учебные товары';
  price: number;
  oldPrice?: number;
  currency: '₸';
  rating: number;
  reviewsCount: number;
  badge?: string;
  description: string;
  source: string;
  availability: 'На складе' | 'Быстрая доставка' | 'Ожидается';
  images: string[];
  details: { label: string; value: string }[];
  specs: { label: string; value: string }[];
  packageIncludes: string[];
  variants: { name: string; price: number }[];
  reviews: { user: string; title: string; text: string; rating: number }[];
}

const fallbackImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';

export const MARKET_PRODUCTS: MarketProduct[] = [
  {
    id: 'p1',
    slug: 'macbook-air-m3',
    brand: 'Apple',
    name: 'MacBook Air 13 M3',
    model: 'M3 / 8GB / 256GB',
    category: 'Ноутбуки',
    price: 569000,
    oldPrice: 629000,
    currency: '₸',
    rating: 4.9,
    reviewsCount: 418,
    badge: 'Лидер продаж',
    description: 'MacBook Air M3 — тонкий и мощный ноутбук для учёбы, работы и творческих задач в течение всего дня. Он сочетает портативность, улучшенную энергоэффективность и высокую скорость отклика, что особенно актуально для студентов и специалистов.',
    source: 'Apple Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Apple' },
      { label: 'Платформа', value: 'MacBook Air' },
      { label: 'Экран', value: '13.6" Liquid Retina' },
      { label: 'Операционная система', value: 'macOS' }
    ],
    specs: [
      { label: 'Процессор', value: 'Apple M3' },
      { label: 'RAM', value: '8 ГБ' },
      { label: 'SSD', value: '256 ГБ' },
      { label: 'Батарея', value: 'До 18 часов' },
      { label: 'Вес', value: '1.24 кг' }
    ],
    packageIncludes: ['Ноутбук', 'USB-C зарядное устройство', 'Кабель USB-C', 'Инструкция'],
    variants: [
      { name: '256 GB Silver', price: 569000 },
      { name: '512 GB Silver', price: 629000 },
      { name: '512 GB Space Gray', price: 629000 }
    ],
    reviews: [
      { user: 'Пользователь 1', title: 'Очень тихий и быстрый', text: 'Легкий, подходит для учёбы, вебинаров, работы в браузере и редакторе. Качество экрана очень хорошее.', rating: 5 },
      { user: 'Покупатель', title: 'Отличный для студента', text: 'Тонкий, аккумулятор держит весь день. Покупкой доволен.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Надёжный выбор', text: 'Модель кажется сбалансированной по цене и функциональности для повседневной работы.', rating: 4 }
    ]
  },
  {
    id: 'p2',
    slug: 'lenovo-thinkpad-e14',
    brand: 'Lenovo',
    name: 'ThinkPad E14 Gen 5',
    model: 'Intel Core i5 / 16GB / 512GB',
    category: 'Ноутбуки',
    price: 499000,
    oldPrice: 548000,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 326,
    badge: 'Для бизнеса',
    description: 'Lenovo ThinkPad E14 — надежный ноутбук для учебных задач, программирования и офисной работы. Устройство сочетает в себе прочный корпус, удобную клавиатуру и хороший набор портов.',
    source: 'Lenovo Center • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555618560-8d9cc8d3f9ea?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Lenovo' },
      { label: 'Платформа', value: 'ThinkPad' },
      { label: 'Экран', value: '14" Full HD' },
      { label: 'Режим', value: 'Для работы и учёбы' }
    ],
    specs: [
      { label: 'Процессор', value: 'Intel Core i5' },
      { label: 'RAM', value: '16 ГБ' },
      { label: 'SSD', value: '512 ГБ' },
      { label: 'Батарея', value: 'До 12 часов' },
      { label: 'Вес', value: '1.64 кг' }
    ],
    packageIncludes: ['Ноутбук', 'Зарядное устройство', 'Кабель HDMI', 'Инструкция'],
    variants: [
      { name: '16GB / 512GB', price: 499000 },
      { name: '16GB / 1TB', price: 549000 },
      { name: '32GB / 1TB', price: 629000 }
    ],
    reviews: [
      { user: 'Пользователь 2', title: 'Крепкий и стабильный', text: 'Очень удобная клавиатура, подходит под длительные занятия и учебные проекты.', rating: 5 },
      { user: 'Покупатель', title: 'Хороший офисный ноутбук', text: 'Надежный, без шума, хорошо работает в вузе и на работе.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Подойдёт для технических дисциплин', text: 'Удобно использовать для средних нагрузок и работы с документами.', rating: 5 }
    ]
  },
  {
    id: 'p3',
    slug: 'asus-vivobook-15',
    brand: 'ASUS',
    name: 'Vivobook 15 X1504',
    model: 'Intel Core i7 / 16GB / 512GB',
    category: 'Ноутбуки',
    price: 429000,
    oldPrice: 469000,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 294,
    badge: 'Популярный',
    description: 'ASUS Vivobook 15 — доступный ноутбук с хорошим балансом производительности и качества изображения, идеально подходящий для учебы, интернет-серфинга и работы с документами.',
    source: 'ASUS Center • Алматы',
    availability: 'Быстрая доставка',
    images: [
      'https://images.unsplash.com/photo-1569818385875-2e11d9f2751b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1597197037535-35bb9f2a0f1c?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'ASUS' },
      { label: 'Платформа', value: 'Vivobook' },
      { label: 'Экран', value: '15.6" FHD' },
      { label: 'Дизайн', value: 'Лаконичный' }
    ],
    specs: [
      { label: 'Процессор', value: 'Intel Core i7' },
      { label: 'RAM', value: '16 ГБ' },
      { label: 'SSD', value: '512 ГБ' },
      { label: 'Батарея', value: 'До 10 часов' },
      { label: 'Вес', value: '1.75 кг' }
    ],
    packageIncludes: ['Ноутбук', 'Зарядное устройство', 'Сумка', 'Инструкция'],
    variants: [
      { name: '16GB / 512GB', price: 429000 },
      { name: '16GB / 1TB', price: 479000 },
      { name: '24GB / 1TB', price: 519000 }
    ],
    reviews: [
      { user: 'Пользователь 3', title: 'Подходит для повседневных задач', text: 'Удобный, практичный, хорошо работает при открытом браузере и документах одновременно.', rating: 4 },
      { user: 'Покупатель', title: 'Нормальный экран и скорость', text: 'Нравится компактность и цена. Хороший вариант для учебы.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Доступный и комфортный', text: 'Хороший баланс по характеристикам и стоимости.', rating: 4 }
    ]
  },
  {
    id: 'p4',
    slug: 'hp-pavilion-15',
    brand: 'HP',
    name: 'Pavilion 15-eg',
    model: 'AMD Ryzen 5 / 16GB / 512GB',
    category: 'Ноутбуки',
    price: 379000,
    oldPrice: 418000,
    currency: '₸',
    rating: 4.6,
    reviewsCount: 248,
    badge: 'Идеальный баланс',
    description: 'HP Pavilion 15 — мощный ноутбук для выполнения учебных заданий, редактирования документов, работы с таблицами и мультимедиа без лишнего веса.',
    source: 'HP Digital • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555618560-8d9cc8d3f9ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'HP' },
      { label: 'Платформа', value: 'Pavilion' },
      { label: 'Экран', value: '15.6" FHD IPS' },
      { label: 'Цель', value: 'Учеба и работа' }
    ],
    specs: [
      { label: 'Процессор', value: 'AMD Ryzen 5' },
      { label: 'RAM', value: '16 ГБ' },
      { label: 'SSD', value: '512 ГБ' },
      { label: 'Батарея', value: 'До 9 часов' },
      { label: 'Вес', value: '1.7 кг' }
    ],
    packageIncludes: ['Ноутбук', 'Зарядное устройство', 'Кабель USB', 'Инструкция'],
    variants: [
      { name: '16GB / 512GB', price: 379000 },
      { name: '16GB / 1TB', price: 429000 },
      { name: '32GB / 1TB', price: 489000 }
    ],
    reviews: [
      { user: 'Пользователь 4', title: 'Надежный и универсальный', text: 'С ним удобно готовить домашние задания, смотреть лекции и работать в документах.', rating: 5 },
      { user: 'Покупатель', title: 'Доступный вариант', text: 'Подходит для студентов технических и гуманитарных направлений.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Мощный и удобный', text: 'Хороший набор конфигураций, экран комфортный для учебы.', rating: 4 }
    ]
  },
  {
    id: 'p5',
    slug: 'acer-aspire-5',
    brand: 'Acer',
    name: 'Aspire 5 A515',
    model: 'Ryzen 7 / 16GB / 512GB',
    category: 'Ноутбуки',
    price: 409000,
    oldPrice: 449000,
    currency: '₸',
    rating: 4.6,
    reviewsCount: 233,
    badge: 'Ценность',
    description: 'Acer Aspire 5 — практичный ноутбук с хорошей производительностью для учебы, программирования, аналитики и повседневных задач.',
    source: 'Acer Market • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555618560-8d9cc8d3f9ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Acer' },
      { label: 'Платформа', value: 'Aspire' },
      { label: 'Экран', value: '15.6" IPS' },
      { label: 'Пользователь', value: 'Студент / работа' }
    ],
    specs: [
      { label: 'Процессор', value: 'AMD Ryzen 7' },
      { label: 'RAM', value: '16 ГБ' },
      { label: 'SSD', value: '512 ГБ' },
      { label: 'Батарея', value: 'До 8 часов' },
      { label: 'Вес', value: '1.78 кг' }
    ],
    packageIncludes: ['Ноутбук', 'Зарядное устройство', 'Сумка', 'Инструкция'],
    variants: [
      { name: '16GB / 512GB', price: 409000 },
      { name: '16GB / 1TB', price: 459000 },
      { name: '32GB / 1TB', price: 529000 }
    ],
    reviews: [
      { user: 'Пользователь 5', title: 'Хороший ноутбук за свои деньги', text: 'Удобный для обучения и бытовых задач. Быстрый и стабильный.', rating: 5 },
      { user: 'Покупатель', title: 'Легко справляется с задачами', text: 'Нормально запускает программы и работает с документами.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Хороший выбор для учебы', text: 'Достойный вариант для студента и работы в браузере.', rating: 4 }
    ]
  },
  {
    id: 'p6',
    slug: 'dell-xps-13',
    brand: 'Dell',
    name: 'XPS 13 Plus',
    model: 'Intel Core i7 / 16GB / 512GB',
    category: 'Ноутбуки',
    price: 619000,
    oldPrice: 679000,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 286,
    badge: 'Премиум',
    description: 'Dell XPS 13 — компактный и премиальный ноутбук для тех, кто ценит легкость, высокий уровень сборки и комфорт при работе в дороге.',
    source: 'Dell Premium • Алматы',
    availability: 'Ожидается',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555618560-8d9cc8d3f9ea?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Dell' },
      { label: 'Платформа', value: 'XPS' },
      { label: 'Экран', value: '13.4" UHD+' },
      { label: 'Вес', value: '1.17 кг' }
    ],
    specs: [
      { label: 'Процессор', value: 'Intel Core i7' },
      { label: 'RAM', value: '16 ГБ' },
      { label: 'SSD', value: '512 ГБ' },
      { label: 'Батарея', value: 'До 14 часов' },
      { label: 'Вес', value: '1.17 кг' }
    ],
    packageIncludes: ['Ноутбук', 'Зарядное устройство USB-C', 'Кабель', 'Инструкция'],
    variants: [
      { name: '16GB / 512GB', price: 619000 },
      { name: '16GB / 1TB', price: 679000 },
      { name: '32GB / 1TB', price: 749000 }
    ],
    reviews: [
      { user: 'Пользователь 6', title: 'Очень тонкий и мощный', text: 'Приятный экран, легкий вес, подходит для поездок и ежедневной работы.', rating: 5 },
      { user: 'Покупатель', title: 'Премиальный и тихий', text: 'Довольно комфортная модель для учебы и работы.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Почти идеальный', text: 'Модель красивая, тихая и заметно выигрывает по эргономике.', rating: 5 }
    ]
  },
  {
    id: 'p7',
    slug: 'hp-envy-x360',
    brand: 'HP',
    name: 'Envy x360 14',
    model: 'Ryzen 7 / 16GB / 1TB',
    category: 'Ноутбуки',
    price: 449000,
    oldPrice: 509000,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 209,
    badge: '2-в-1',
    description: 'HP Envy x360 — гибридный ноутбук с сенсорным экраном, который удобно использовать как для обучения, так и для творческих задач, заметок и мультимедиа.',
    source: 'HP Lifestyle • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569818385875-2e11d9f2751b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555618560-8d9cc8d3f9ea?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'HP' },
      { label: 'Платформа', value: 'Envy x360' },
      { label: 'Экран', value: '14" 2-in-1' },
      { label: 'Материал', value: 'Алюминий' }
    ],
    specs: [
      { label: 'Процессор', value: 'AMD Ryzen 7' },
      { label: 'RAM', value: '16 ГБ' },
      { label: 'SSD', value: '1 ТБ' },
      { label: 'Батарея', value: 'До 10 часов' },
      { label: 'Вес', value: '1.43 кг' }
    ],
    packageIncludes: ['Ноутбук', 'Зарядное устройство', 'Кабель USB-C', 'Инструкция'],
    variants: [
      { name: '16GB / 1TB', price: 449000 },
      { name: '32GB / 1TB', price: 529000 },
      { name: '32GB / 2TB', price: 599000 }
    ],
    reviews: [
      { user: 'Пользователь 7', title: 'Вариант для тех, кто любит гибкость', text: 'Удобно работает как планшет и как ноутбук одновременно.', rating: 5 },
      { user: 'Покупатель', title: 'Прекрасная идея для учебы', text: 'Нормально обрабатывает задачи и приятно выглядит.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Практично и красиво', text: 'Подходит для презентаций, заметок и работы в дороге.', rating: 5 }
    ]
  },
  {
    id: 'p8',
    slug: 'asus-zenbook-14',
    brand: 'ASUS',
    name: 'Zenbook 14 OLED',
    model: 'Intel Core Ultra 7 / 16GB / 1TB',
    category: 'Ноутбуки',
    price: 699000,
    oldPrice: 759000,
    currency: '₸',
    rating: 4.9,
    reviewsCount: 189,
    badge: 'OLED',
    description: 'ASUS Zenbook 14 OLED — ультратонкий ноутбук с ярким дисплеем, быстро обрабатывает учебные задачи, работу с графикой и тяжелые приложения.',
    source: 'ASUS Premium • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1569818385875-2e11d9f2751b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'ASUS' },
      { label: 'Платформа', value: 'Zenbook' },
      { label: 'Экран', value: '14" OLED' },
      { label: 'Портативность', value: 'Легкий' }
    ],
    specs: [
      { label: 'Процессор', value: 'Intel Core Ultra 7' },
      { label: 'RAM', value: '16 ГБ' },
      { label: 'SSD', value: '1 ТБ' },
      { label: 'Батарея', value: 'До 13 часов' },
      { label: 'Вес', value: '1.17 кг' }
    ],
    packageIncludes: ['Ноутбук', 'USB-C зарядка', 'Кабель', 'Инструкция'],
    variants: [
      { name: '16GB / 1TB', price: 699000 },
      { name: '32GB / 1TB', price: 769000 },
      { name: '32GB / 2TB', price: 859000 }
    ],
    reviews: [
      { user: 'Пользователь 8', title: 'Экран потрясающий', text: 'Картинка яркая и насыщенная. Очень приятно использовать в течение дня.', rating: 5 },
      { user: 'Покупатель', title: 'Легкий универсальный ноутбук', text: 'Отлично подходит для студентов и дизайнеров.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Высокое качество сборки', text: 'Модель выглядит премиально и работает без задержек.', rating: 5 }
    ]
  },
  {
    id: 'p9',
    slug: 'samsung-galaxy-s25',
    brand: 'Samsung',
    name: 'Galaxy S25',
    model: '8/256GB',
    category: 'Смартфоны',
    price: 399000,
    oldPrice: 449000,
    currency: '₸',
    rating: 4.9,
    reviewsCount: 512,
    badge: 'Новинка',
    description: 'Samsung Galaxy S25 — современный смартфон с мощным процессором, качественной камерой и стабильной работой в течение дня. Подходит для работы, обучения, съёмки фото и общения.',
    source: 'Samsung Official • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Samsung' },
      { label: 'Экран', value: '6.2" Dynamic AMOLED' },
      { label: 'Процессор', value: 'Snapdragon 8 Elite' },
      { label: 'ОС', value: 'Android 15' }
    ],
    specs: [
      { label: 'Экран', value: '6.2"' },
      { label: 'Процессор', value: 'Snapdragon 8 Elite' },
      { label: 'Камера', value: '50MP + 12MP + 10MP' },
      { label: 'Память', value: '256 ГБ' },
      { label: 'Батарея', value: '4000 мАч' }
    ],
    packageIncludes: ['Смартфон', 'Зарядное устройство', 'USB-C кабель', 'Документация'],
    variants: [
      { name: '128GB Blue', price: 369000 },
      { name: '256GB Black', price: 399000 },
      { name: '512GB Silver', price: 469000 }
    ],
    reviews: [
      { user: 'Пользователь 9', title: 'Очень плавный и быстрый', text: 'Гладкий интерфейс, отличная камера и стабильная работа в приложениях.', rating: 5 },
      { user: 'Покупатель', title: 'Хороший выбор для ежедневно задач', text: 'Легко держит заряд и приятно выглядит. Я доволен.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Качественный смартфон', text: 'Подходит для учёбы, общения и создания контента.', rating: 5 }
    ]
  },
  {
    id: 'p10',
    slug: 'iphone-16',
    brand: 'Apple',
    name: 'iPhone 16',
    model: '128GB',
    category: 'Смартфоны',
    price: 429000,
    oldPrice: 489000,
    currency: '₸',
    rating: 4.9,
    reviewsCount: 610,
    badge: 'Классика',
    description: 'iPhone 16 оснащён мощным процессором, продуманным дизайном и продвинутой фотосъёмкой. Это универсальный смартфон для учебы, работы и повседневной жизни.',
    source: 'Apple Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Apple' },
      { label: 'Экран', value: '6.1" Super Retina XDR' },
      { label: 'Процессор', value: 'A18' },
      { label: 'ОС', value: 'iOS 18' }
    ],
    specs: [
      { label: 'Экран', value: '6.1"' },
      { label: 'Процессор', value: 'A18' },
      { label: 'Камера', value: '48MP Dual Camera' },
      { label: 'Память', value: '128 ГБ' },
      { label: 'Батарея', value: 'До 22 часов' }
    ],
    packageIncludes: ['Смартфон', 'USB-C зарядное устройство', 'Кабель', 'Документация'],
    variants: [
      { name: '128GB Black', price: 429000 },
      { name: '256GB Blue', price: 489000 },
      { name: '512GB White', price: 549000 }
    ],
    reviews: [
      { user: 'Пользователь 10', title: 'Лучший для экосистемы Apple', text: 'Надежный, быстро работает и отлично подходит для заметок и учебных задач.', rating: 5 },
      { user: 'Покупатель', title: 'Просто классика', text: 'Смартфон без лишних компромиссов. Камера и интерфейс на высоте.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Комфортно в использовании', text: 'Подходит для повседневного использования и учебы.', rating: 4 }
    ]
  },
  {
    id: 'p11',
    slug: 'xiaomi-redmi-note-13',
    brand: 'Xiaomi',
    name: 'Redmi Note 13',
    model: '8/256GB',
    category: 'Смартфоны',
    price: 189000,
    oldPrice: 219000,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 421,
    badge: 'Лучшее соотношение',
    description: 'Xiaomi Redmi Note 13 — доступный смартфон с хорошим экраном, качественной камерой и серьёзной батареей для ежедневного использования.',
    source: 'Xiaomi Shop • Алматы',
    availability: 'Быстрая доставка',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07f6881?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Xiaomi' },
      { label: 'Экран', value: '6.67" AMOLED' },
      { label: 'Процессор', value: 'MediaTek Dimensity 6080' },
      { label: 'ОС', value: 'Android' }
    ],
    specs: [
      { label: 'Экран', value: '6.67"' },
      { label: 'Процессор', value: 'Dimensity 6080' },
      { label: 'Камера', value: '108MP Triple Camera' },
      { label: 'Память', value: '256 ГБ' },
      { label: 'Батарея', value: '5000 мАч' }
    ],
    packageIncludes: ['Смартфон', 'Зарядное устройство', 'Защитный чехол', 'Инструкция'],
    variants: [
      { name: '128GB Midnight', price: 179000 },
      { name: '256GB Blue', price: 189000 },
      { name: '256GB White', price: 199000 }
    ],
    reviews: [
      { user: 'Пользователь 11', title: 'Хорошая батарея', text: 'Без подзарядки хватает на весь день при активном использовании.', rating: 5 },
      { user: 'Покупатель', title: 'Хороший по цене', text: 'Очень достойный вариант для общения и повседневных задач.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Подходит для студента', text: 'Быстрый интерфейс и удобный экран для чтения материалов.', rating: 4 }
    ]
  },
  {
    id: 'p12',
    slug: 'google-pixel-9',
    brand: 'Google',
    name: 'Pixel 9',
    model: '8/256GB',
    category: 'Смартфоны',
    price: 349000,
    oldPrice: 389000,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 305,
    badge: 'AI Фото',
    description: 'Google Pixel 9 — смартфон с сильной камерой и быстрым искусственным интеллектом, который отлично подходит для фото, общения и работы с приложениями.',
    source: 'Google Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07f6881?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Google' },
      { label: 'Экран', value: '6.3" OLED' },
      { label: 'Процессор', value: 'Google Tensor G4' },
      { label: 'ОС', value: 'Android' }
    ],
    specs: [
      { label: 'Экран', value: '6.3"' },
      { label: 'Процессор', value: 'Tensor G4' },
      { label: 'Камера', value: '50MP + 48MP' },
      { label: 'Память', value: '256 ГБ' },
      { label: 'Батарея', value: '4700 мАч' }
    ],
    packageIncludes: ['Смартфон', 'USB-C кабель', 'Зарядное устройство', 'Инструкция'],
    variants: [
      { name: '128GB Hazel', price: 329000 },
      { name: '256GB Obsidian', price: 349000 },
      { name: '256GB Porcelain', price: 359000 }
    ],
    reviews: [
      { user: 'Пользователь 12', title: 'Камера очень хорошая', text: 'Фото выглядят натурально и чётко. Отлично для учёбы и личного контента.', rating: 5 },
      { user: 'Покупатель', title: 'Полезные AI-функции', text: 'Встроенные функции заметно удобнее, чем в других моделях.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Хороший по качеству', text: 'Подходит для тех, кто ценит фото и простоту использования.', rating: 5 }
    ]
  },
  {
    id: 'p13',
    slug: 'samsung-galaxy-a55',
    brand: 'Samsung',
    name: 'Galaxy A55',
    model: '8/256GB',
    category: 'Смартфоны',
    price: 239000,
    oldPrice: 274000,
    currency: '₸',
    rating: 4.6,
    reviewsCount: 388,
    badge: 'Доступно',
    description: 'Samsung Galaxy A55 — надежный современный смартфон с хорошим экраном, качественной батареей и сбалансированными характеристиками под учебу и повседневные задачи.',
    source: 'Samsung Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Samsung' },
      { label: 'Экран', value: '6.6" Super AMOLED' },
      { label: 'Процессор', value: 'Exynos 1480' },
      { label: 'ОС', value: 'Android' }
    ],
    specs: [
      { label: 'Экран', value: '6.6"' },
      { label: 'Процессор', value: 'Exynos 1480' },
      { label: 'Камера', value: '50MP + 12MP + 5MP' },
      { label: 'Память', value: '256 ГБ' },
      { label: 'Батарея', value: '5000 мАч' }
    ],
    packageIncludes: ['Смартфон', 'Зарядное устройство', 'Кабель', 'Руководство'],
    variants: [
      { name: '128GB Awesome Mint', price: 219000 },
      { name: '256GB Awesome Black', price: 239000 },
      { name: '256GB Awesome White', price: 249000 }
    ],
    reviews: [
      { user: 'Пользователь 13', title: 'Удобный для учебы', text: 'Много полезных функций и неплохая батарея.', rating: 5 },
      { user: 'Покупатель', title: 'Хороший для повседневного использования', text: 'Отличный вариант без переплаты за флагман.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Стабильная работа', text: 'Полезен для общения, учебы и веб-серфинга.', rating: 4 }
    ]
  },
  {
    id: 'p14',
    slug: 'iphone-15',
    brand: 'Apple',
    name: 'iPhone 15',
    model: '256GB',
    category: 'Смартфоны',
    price: 369000,
    oldPrice: 419000,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 530,
    badge: 'Популярный',
    description: 'iPhone 15 — мощный помощник для учебы, работы, общения и фото. Удобный, надежный и хорошо интегрируется с остальной экосистемой Apple.',
    source: 'Apple Premium • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Apple' },
      { label: 'Экран', value: '6.1" OLED' },
      { label: 'Процессор', value: 'A16 Bionic' },
      { label: 'ОС', value: 'iOS 17' }
    ],
    specs: [
      { label: 'Экран', value: '6.1"' },
      { label: 'Процессор', value: 'A16' },
      { label: 'Камера', value: '48MP Dual Camera' },
      { label: 'Память', value: '256 ГБ' },
      { label: 'Батарея', value: 'До 20 часов' }
    ],
    packageIncludes: ['Смартфон', 'USB-C зарядное устройство', 'Кабель', 'Документация'],
    variants: [
      { name: '128GB Blue', price: 329000 },
      { name: '256GB Black', price: 369000 },
      { name: '512GB White', price: 439000 }
    ],
    reviews: [
      { user: 'Пользователь 14', title: 'Надежный и быстрый', text: 'Очень удобно использовать в учебе и в повседневных задачах.', rating: 5 },
      { user: 'Покупатель', title: 'Качественный экран и камера', text: 'Нравится интерфейс и стабильная работа приложений.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Лучший вариант в сегменте', text: 'Модель не уступает флагманам по качеству использования.', rating: 5 }
    ]
  },
  {
    id: 'p15',
    slug: 'oneplus-12r',
    brand: 'OnePlus',
    name: 'OnePlus 12R',
    model: '12/256GB',
    category: 'Смартфоны',
    price: 289000,
    oldPrice: 329000,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 246,
    badge: 'Смарт',
    description: 'OnePlus 12R — быстрый и энергоэффективный смартфон с ярким дисплеем и практичной системой камер. Подходит для тех, кто хочет мощную модель без лишней переплаты.',
    source: 'OnePlus Market • Алматы',
    availability: 'Быстрая доставка',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07f6881?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'OnePlus' },
      { label: 'Экран', value: '6.78" AMOLED' },
      { label: 'Процессор', value: 'Snapdragon 8 Gen 2' },
      { label: 'ОС', value: 'Android' }
    ],
    specs: [
      { label: 'Экран', value: '6.78"' },
      { label: 'Процессор', value: 'Snapdragon 8 Gen 2' },
      { label: 'Камера', value: '50MP + 8MP + 2MP' },
      { label: 'Память', value: '256 ГБ' },
      { label: 'Батарея', value: '5500 мАч' }
    ],
    packageIncludes: ['Смартфон', 'USB-C кабель', 'Зарядное устройство', 'Чехол'],
    variants: [
      { name: '128GB Blue', price: 259000 },
      { name: '256GB Black', price: 289000 },
      { name: '512GB White', price: 339000 }
    ],
    reviews: [
      { user: 'Пользователь 15', title: 'Очень быстрый и приятный экран', text: 'Подходит для учебы, стриминга и повседневного использования.', rating: 5 },
      { user: 'Покупатель', title: 'Хороший аппарат', text: 'Удобный в работе и достаточно мощный для повседневных задач.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Достойная модель', text: 'Легко держит заряд и не перегревается даже при работе.', rating: 4 }
    ]
  },
  {
    id: 'p16',
    slug: 'xiaomi-poco-x6-pro',
    brand: 'Xiaomi',
    name: 'POCO X6 Pro',
    model: '12/512GB',
    category: 'Смартфоны',
    price: 259000,
    oldPrice: 299000,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 276,
    badge: 'Игровой',
    description: 'POCO X6 Pro — смартфон с хорошим балансом цены и производительности, сильной батареей и комфортным игровым опытом для учебы и развлечений.',
    source: 'POCO Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07f6881?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'POCO' },
      { label: 'Экран', value: '6.67" AMOLED' },
      { label: 'Процессор', value: 'Dimensity 8300-Ultra' },
      { label: 'ОС', value: 'Android' }
    ],
    specs: [
      { label: 'Экран', value: '6.67"' },
      { label: 'Процессор', value: 'Dimensity 8300-Ultra' },
      { label: 'Камера', value: '64MP + 8MP + 2MP' },
      { label: 'Память', value: '512 ГБ' },
      { label: 'Батарея', value: '5000 мАч' }
    ],
    packageIncludes: ['Смартфон', 'Кабель', 'Зарядное устройство', 'Чехол'],
    variants: [
      { name: '8GB / 256GB', price: 229000 },
      { name: '12GB / 512GB', price: 259000 },
      { name: '12GB / 1TB', price: 299000 }
    ],
    reviews: [
      { user: 'Пользователь 16', title: 'Мощно и недорого', text: 'Отличная модель для тех, кто хочет быстрый смартфон и неплохую батарею.', rating: 5 },
      { user: 'Покупатель', title: 'Аккуратный игровой смартфон', text: 'Чёткий дисплей, нормальная скорость и приятная цена.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Хороший выбор качества', text: 'Вполне подходит для ежедневного использования и обучения.', rating: 4 }
    ]
  },
  {
    id: 'p17',
    slug: 'logitech-mx-master-3s',
    brand: 'Logitech',
    name: 'MX Master 3S',
    model: 'Wireless Mouse',
    category: 'Аксессуары',
    price: 34500,
    oldPrice: 38900,
    currency: '₸',
    rating: 4.9,
    reviewsCount: 268,
    badge: 'Профи',
    description: 'Logitech MX Master 3S — эргономичная беспроводная мышь для студентов, дизайнеров и тех, кто много работает в документах и графических программах.',
    source: 'Logitech Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Logitech' },
      { label: 'Тип подключения', value: 'Bluetooth / USB receiver' },
      { label: 'Дизайн', value: 'Эргономичный' },
      { label: 'Питание', value: 'Аккумулятор' }
    ],
    specs: [
      { label: 'Скорость', value: 'До 8,000 DPI' },
      { label: 'Кнопки', value: '7 кнопок' },
      { label: 'Батарея', value: 'До 70 дней' },
      { label: 'Поддержка', value: 'Windows / macOS' }
    ],
    packageIncludes: ['Мышь', 'USB-C кабель', 'Инструкция'],
    variants: [
      { name: 'Graphite', price: 34500 },
      { name: 'Black', price: 34900 },
      { name: 'Champagne', price: 36900 }
    ],
    reviews: [
      { user: 'Пользователь 17', title: 'Идеально для работы', text: 'Очень удобно, особенно при долгой работе в ноутбуке.', rating: 5 },
      { user: 'Покупатель', title: 'Качественная мышь', text: 'Удобный хват, точность и стабильный сигнал.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Пользуюсь каждый день', text: 'На заметку, учебу и работу — лучший вариант.', rating: 5 }
    ]
  },
  {
    id: 'p18',
    slug: 'logitech-k380',
    brand: 'Logitech',
    name: 'K380 Multi-Device Keyboard',
    model: 'Wireless Keyboard',
    category: 'Аксессуары',
    price: 21900,
    oldPrice: 24900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 301,
    badge: 'Компакт',
    description: 'Logitech K380 — компактная беспроводная клавиатура для ноутбука, планшета и рабочего пространства. Отлично подходит для компактных рабочих мест и учебных кабинетов.',
    source: 'Logitech Shop • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Logitech' },
      { label: 'Тип', value: 'Беспроводная' },
      { label: 'Подключение', value: 'Bluetooth' },
      { label: 'Форм-фактор', value: 'Компактный' }
    ],
    specs: [
      { label: 'Клавиши', value: '78' },
      { label: 'Питание', value: '2 батарейки' },
      { label: 'Поддержка', value: 'Windows, macOS, Android' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Клавиатура', 'Батарейки', 'Инструкция'],
    variants: [
      { name: 'Off White', price: 21900 },
      { name: 'Graphite', price: 22500 },
      { name: 'Rose', price: 22900 }
    ],
    reviews: [
      { user: 'Пользователь 18', title: 'Не занимает много места', text: 'Отлично подходит для рабочего стола и учебной комнаты.', rating: 5 },
      { user: 'Покупатель', title: 'Легко подключается и работает', text: 'Подключается быстро и очень удобно в поездках.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Баланс цены и качества', text: 'Клавиатура функциональна и выглядит аккуратно.', rating: 5 }
    ]
  },
  {
    id: 'p19',
    slug: 'jbl-tune-760nc',
    brand: 'JBL',
    name: 'Tune 760NC',
    model: 'Wireless Headphones',
    category: 'Аксессуары',
    price: 47900,
    oldPrice: 55900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 328,
    badge: 'Шумоподавление',
    description: 'JBL Tune 760NC — комфортные беспроводные наушники с хорошим шумоподавлением, качественным звуком и долгой автономностью для учебы, поездок и работы.',
    source: 'JBL Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'JBL' },
      { label: 'Тип', value: 'Накладные' },
      { label: 'Bluetooth', value: '5.3' },
      { label: 'Шумоподавление', value: 'Да' }
    ],
    specs: [
      { label: 'Автономность', value: 'До 50 часов' },
      { label: 'Тип подключения', value: 'Bluetooth' },
      { label: 'Фирменный звук', value: 'JBL Pure Bass' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Наушники', 'USB-C кабель', 'Проводной режим', 'Инструкция'],
    variants: [
      { name: 'Black', price: 47900 },
      { name: 'Blue', price: 48900 },
      { name: 'White', price: 49900 }
    ],
    reviews: [
      { user: 'Пользователь 19', title: 'Отличное звучание', text: 'Сильный бас и удобная посадка. Очень подходит для занятий и поездок.', rating: 5 },
      { user: 'Покупатель', title: 'Нормальная автономность', text: 'Работают долго, удобно хранить и подключать.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Комфортно для учебы', text: 'Даже на длинных занятиях не напрягают.', rating: 5 }
    ]
  },
  {
    id: 'p20',
    slug: 'kingston-nv2-1tb',
    brand: 'Kingston',
    name: 'NV2 1TB SSD',
    model: 'PCIe 4.0 NVMe',
    category: 'Аксессуары',
    price: 24500,
    oldPrice: 27900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 343,
    badge: 'SSD',
    description: 'Kingston NV2 — надежный SSD для ускорения работы ноутбука, повышения скорости загрузки и хранения данных, особенно актуален для студентов и специалистов.',
    source: 'IT Access • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Kingston' },
      { label: 'Тип', value: 'SSD' },
      { label: 'Интерфейс', value: 'PCIe 4.0 NVMe' },
      { label: 'Назначение', value: 'Ускорение системы' }
    ],
    specs: [
      { label: 'Объем', value: '1 ТБ' },
      { label: 'Чтение', value: 'До 3500 MB/s' },
      { label: 'Запись', value: 'До 2100 MB/s' },
      { label: 'Гарантия', value: '3 года' }
    ],
    packageIncludes: ['SSD накопитель', 'Инструкция', 'Гарантийный талон'],
    variants: [
      { name: '1TB', price: 24500 },
      { name: '2TB', price: 41900 },
      { name: '500GB', price: 14200 }
    ],
    reviews: [
      { user: 'Пользователь 20', title: 'Серьёзно ускоряет ноутбук', text: 'Сразу почувствовал разницу в скорости загрузки и работы программ.', rating: 5 },
      { user: 'Покупатель', title: 'Удобно для обновления', text: 'Обычный и практичный SSD для актуализированной техники.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Надежный вариант', text: 'Достойный способ улучшить ноутбук без переплаты.', rating: 4 }
    ]
  },
  {
    id: 'p21',
    slug: 'sandisk-ultra-flair-256gb',
    brand: 'SanDisk',
    name: 'Ultra Flair 256GB',
    model: 'USB 3.0 Flash Drive',
    category: 'Аксессуары',
    price: 6900,
    oldPrice: 8200,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 197,
    badge: 'Портативный',
    description: 'SanDisk Ultra Flair 256GB — компактная флешка для хранения лекций, материалов, файла и учебных проектов между устройствами.',
    source: 'Flash Expert • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'SanDisk' },
      { label: 'Тип', value: 'USB флешка' },
      { label: 'Интерфейс', value: 'USB 3.0' },
      { label: 'Назначение', value: 'Хранение данных' }
    ],
    specs: [
      { label: 'Объем', value: '256 ГБ' },
      { label: 'Скорость', value: 'Высокая' },
      { label: 'Совместимость', value: 'Windows / macOS' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Флешка', 'Подарочная упаковка'],
    variants: [
      { name: '64GB', price: 3200 },
      { name: '128GB', price: 4900 },
      { name: '256GB', price: 6900 }
    ],
    reviews: [
      { user: 'Пользователь 21', title: 'Надежная и компактная', text: 'Хорошо хранит лекции и учебные материалы без потери данных.', rating: 5 },
      { user: 'Покупатель', title: 'Практичный аксессуар', text: 'Очень удобно переносить проекты и файлы между компами.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Легко работает', text: 'Хорошо подходит для учебы и ежедневного использования.', rating: 4 }
    ]
  },
  {
    id: 'p22',
    slug: 'logitech-g102',
    brand: 'Logitech',
    name: 'G102 Lightsync',
    model: 'Gaming Mouse',
    category: 'Аксессуары',
    price: 19600,
    oldPrice: 22900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 237,
    badge: 'Игровая',
    description: 'Logitech G102 — игровая мышь с точным датчиком, быстрым сенсором и комфортным хватом, подходящая для игр, аналитики и онлайн-работы.',
    source: 'Logitech Game • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Logitech' },
      { label: 'Тип', value: 'Игровая мышь' },
      { label: 'Подключение', value: 'USB' },
      { label: 'Подсветка', value: 'RGB' }
    ],
    specs: [
      { label: 'DPI', value: 'До 8,000' },
      { label: 'Кнопки', value: '6' },
      { label: 'Питание', value: 'USB' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Мышь', 'Кабель', 'Инструкция'],
    variants: [
      { name: 'Black', price: 19600 },
      { name: 'White', price: 20900 },
      { name: 'Limited', price: 21900 }
    ],
    reviews: [
      { user: 'Пользователь 22', title: 'Очень чёткая', text: 'Отлично ощущается в руке и удобна для долгой работы.', rating: 5 },
      { user: 'Покупатель', title: 'Надежная игровая мышь', text: 'Хорошо отзывается и очень точная.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Подходит и для игры, и для работы', text: 'Легко точиться и удобно держать в руке.', rating: 5 }
    ]
  },
  {
    id: 'p23',
    slug: 'hyperx-cloud-iii',
    brand: 'HyperX',
    name: 'Cloud III',
    model: 'Gaming Headset',
    category: 'Аксессуары',
    price: 52900,
    oldPrice: 58900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 252,
    badge: 'Игровые',
    description: 'HyperX Cloud III — гарнитура с глубоким и чистым звучанием, комфортной посадкой и хорошей изоляцией для игр, рабочих сессий и учебных аудиоматериалов.',
    source: 'HyperX Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'HyperX' },
      { label: 'Тип', value: 'Наушники' },
      { label: 'Bluetooth', value: 'Нет' },
      { label: 'Назначение', value: 'Игры и музыка' }
    ],
    specs: [
      { label: 'Автономность', value: 'До 40 часов' },
      { label: 'Тип', value: 'Проводные' },
      { label: 'Шумоподавление', value: 'Частичное' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Наушники', 'Провод', 'Инструкция'],
    variants: [
      { name: 'Black', price: 52900 },
      { name: 'Red', price: 53900 },
      { name: 'White', price: 54900 }
    ],
    reviews: [
      { user: 'Пользователь 23', title: 'Очень удобные', text: 'Плотная посадка и хороший звук. Подходят и на долгие сессии.', rating: 5 },
      { user: 'Покупатель', title: 'Купил для работы и игр', text: 'Хорошие наушники, особенно при длительном использовании.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Классический вариант', text: 'Чёткое звучание и приятный комфорт.', rating: 5 }
    ]
  },
  {
    id: 'p24',
    slug: 'anker-735-charger',
    brand: 'Anker',
    name: '735 65W Charger',
    model: 'USB-C GaN',
    category: 'Аксессуары',
    price: 16900,
    oldPrice: 19900,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 182,
    badge: 'Быстрая зарядка',
    description: 'Anker 735 — компактное зарядное устройство с высокой мощностью для ноутбука, смартфона и планшета в одном комплекте.',
    source: 'Anker Shop • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Anker' },
      { label: 'Мощность', value: '65 W' },
      { label: 'Тип', value: 'USB-C GaN' },
      { label: 'Назначение', value: 'Зарядка' }
    ],
    specs: [
      { label: 'Выход', value: '65W' },
      { label: 'Порты', value: '2 USB-C' },
      { label: 'Безопасность', value: 'Высокая' },
      { label: 'Гарантия', value: '18 месяцев' }
    ],
    packageIncludes: ['Зарядное устройство', 'USB-C кабель', 'Инструкция'],
    variants: [
      { name: '65W', price: 16900 },
      { name: '100W', price: 23900 },
      { name: 'Travel Kit', price: 28900 }
    ],
    reviews: [
      { user: 'Пользователь 24', title: 'Часто использую дома', text: 'Заряжает быстро и компактно, удобно брать в поездки.', rating: 5 },
      { user: 'Покупатель', title: 'Стабильная зарядка', text: 'Подходит для ноутбука и смартфона в одном комплекте.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Практично и безопасно', text: 'Мощность и компактность на хорошем уровне.', rating: 4 }
    ]
  },
  {
    id: 'p25',
    slug: 'wd-my-passport-2tb',
    brand: 'WD',
    name: 'My Passport 2TB',
    model: 'Portable External HDD',
    category: 'Аксессуары',
    price: 27900,
    oldPrice: 32900,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 203,
    badge: 'Хранение',
    description: 'WD My Passport 2TB — надежный внешний накопитель для хранения учебных материалов, презентаций, фото и файлов проектов.',
    source: 'Storage Hub • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'WD' },
      { label: 'Тип', value: 'Внешний жесткий диск' },
      { label: 'Объем', value: '2 ТБ' },
      { label: 'Портативность', value: 'Да' }
    ],
    specs: [
      { label: 'Объем', value: '2 ТБ' },
      { label: 'Интерфейс', value: 'USB 3.0' },
      { label: 'Скорость', value: 'Средняя' },
      { label: 'Гарантия', value: '2 года' }
    ],
    packageIncludes: ['Накопитель', 'USB кабель', 'Инструкция'],
    variants: [
      { name: '1TB', price: 17900 },
      { name: '2TB', price: 27900 },
      { name: '4TB', price: 42900 }
    ],
    reviews: [
      { user: 'Пользователь 25', title: 'Надежный бэкап', text: 'Очень удобно хранить весь курс и архивы учебных материалов.', rating: 5 },
      { user: 'Покупатель', title: 'Простой и надежный', text: 'Подходит для ежедневного хранения файлов и проектов.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Быстро работает', text: 'Хорошо подходит для хранения крупных папок и архивов.', rating: 4 }
    ]
  },
  {
    id: 'p26',
    slug: 'razer-backpack-32l',
    brand: 'Razer',
    name: 'Backpack 32L',
    model: 'Travel Pack',
    category: 'Учебные товары',
    price: 34900,
    oldPrice: 39900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 214,
    badge: 'Для кампуса',
    description: 'Razer Backpack 32L — вместительный и практичный рюкзак для ноутбука, учебников, зарядных устройств и повседневных вещей студента.',
    source: 'Razer Store • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Razer' },
      { label: 'Объем', value: '32 л' },
      { label: 'Материал', value: 'Полиэстер' },
      { label: 'Назначение', value: 'Школа и университет' }
    ],
    specs: [
      { label: 'Отделения', value: '4' },
      { label: 'Поддержка ноутбука', value: '15.6"' },
      { label: 'Ремни', value: 'Регулируемые' },
      { label: 'Цвет', value: 'Черный' }
    ],
    packageIncludes: ['Рюкзак', 'Подарочная упаковка'],
    variants: [
      { name: 'Black', price: 34900 },
      { name: 'Gray', price: 35900 },
      { name: 'Pro Pack', price: 39900 }
    ],
    reviews: [
      { user: 'Пользователь 26', title: 'Вмещает всё необходимое', text: 'Подходит на учебный день, ноутбук, зарядку и воду.', rating: 5 },
      { user: 'Покупатель', title: 'Очень практичный', text: 'Хорошо организовано пространство внутри, сохраняет порядок.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Удобно для студентов', text: 'Отлично держит форму и не тяжелый.', rating: 4 }
    ]
  },
  {
    id: 'p27',
    slug: 'swissgear-backpack-25l',
    brand: 'SwissGear',
    name: 'Backpack 25L',
    model: 'Daily School Pack',
    category: 'Учебные товары',
    price: 23900,
    oldPrice: 27900,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 192,
    badge: 'Удобный',
    description: 'SwissGear Backpack 25L — практичный и легкий рюкзак для повседневной учебы, коротких поездок и хранения техники и канцелярии.',
    source: 'SwissGear Market • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'SwissGear' },
      { label: 'Объем', value: '25 л' },
      { label: 'Материал', value: 'Плотная ткань' },
      { label: 'Назначение', value: 'Учеба' }
    ],
    specs: [
      { label: 'Отделения', value: '3' },
      { label: 'Поддержка ноутбука', value: '14"' },
      { label: 'Ремни', value: 'Плечевые' },
      { label: 'Цвет', value: 'Темно-синий' }
    ],
    packageIncludes: ['Рюкзак', 'Подарочная упаковка'],
    variants: [
      { name: 'Navy', price: 23900 },
      { name: 'Black', price: 24900 },
      { name: 'Graphite', price: 25900 }
    ],
    reviews: [
      { user: 'Пользователь 27', title: 'Хорошая вместимость', text: 'Нормально вмещает ноутбук, тетради и воду. Очень удобно для поездок.', rating: 5 },
      { user: 'Покупатель', title: 'Легкий и практичный', text: 'Ему легко пользоваться каждый день в кампусе.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Неплохо для бюджета', text: 'Подходит для учебного ритма и коротких поездок.', rating: 4 }
    ]
  },
  {
    id: 'p28',
    slug: 'organizer-a5',
    brand: 'A5',
    name: 'Organizer A5 Weekly',
    model: 'Planner / Organizer',
    category: 'Учебные товары',
    price: 8400,
    oldPrice: 9800,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 176,
    badge: 'Планирование',
    description: 'Organizer A5 — ежедневник и органайзер для планирования занятий, проектов и целей. Идеально подходит для студентов и тех, кто любит структурировать время.',
    source: 'Planner Studio • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'A5' },
      { label: 'Размер', value: 'A5' },
      { label: 'Тип', value: 'Планер' },
      { label: 'Назначение', value: 'Планирование' }
    ],
    specs: [
      { label: 'Страницы', value: '200' },
      { label: 'Линовка', value: 'Еженедельная' },
      { label: 'Материал', value: 'Картон / бумага' },
      { label: 'Гарантия', value: '6 месяцев' }
    ],
    packageIncludes: ['Планер', 'Подарочная упаковка'],
    variants: [
      { name: 'Classic', price: 8400 },
      { name: 'Week Planner', price: 9300 },
      { name: 'Premium', price: 10900 }
    ],
    reviews: [
      { user: 'Пользователь 28', title: 'Очень помогает организовать учебу', text: 'Структурирует учебный день и помогает не забывать дедлайны.', rating: 5 },
      { user: 'Покупатель', title: 'Хороший формат', text: 'Удобный размер и понятный планировщик.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Пригодится студенту', text: 'Легко планировать уроки, задачи и цели.', rating: 5 }
    ]
  },
  {
    id: 'p29',
    slug: 'moleskine-planner',
    brand: 'Moleskine',
    name: 'Planner Classic',
    model: 'A5 Hard Cover',
    category: 'Учебные товары',
    price: 12500,
    oldPrice: 14500,
    currency: '₸',
    rating: 4.9,
    reviewsCount: 221,
    badge: 'Премиум',
    description: 'Moleskine Planner — стильный и функциональный блокнот для планирования занятий, задач, проектов и итогов недели.',
    source: 'Moleskine • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Moleskine' },
      { label: 'Размер', value: 'A5' },
      { label: 'Тип', value: 'Планировщик' },
      { label: 'Материал', value: 'Твердая обложка' }
    ],
    specs: [
      { label: 'Страницы', value: '192' },
      { label: 'Линовка', value: 'Дневник / еженедельник' },
      { label: 'Плотность', value: '100 г/м²' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Планировщик', 'Этикетка бренда'],
    variants: [
      { name: 'Black', price: 12500 },
      { name: 'Cocoa', price: 12900 },
      { name: 'Blue', price: 13200 }
    ],
    reviews: [
      { user: 'Пользователь 29', title: 'Очень качественный', text: 'Дизайн комфортный, бумага гладкая и приятная для письма.', rating: 5 },
      { user: 'Покупатель', title: 'Подходит для учебы', text: 'Хорошо держит структуру и выглядит солидно.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Премиальное качество', text: 'Приятно использовать для важных дел и планирования.', rating: 5 }
    ]
  },
  {
    id: 'p30',
    slug: 'casio-fx-991ex',
    brand: 'Casio',
    name: 'FX-991EX',
    model: 'Scientific Calculator',
    category: 'Учебные товары',
    price: 14500,
    oldPrice: 16900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 198,
    badge: 'Для математики',
    description: 'Casio FX-991EX — научный калькулятор с продвинутыми математическими функциями, идеально подходящий для технических дисциплин, экзаменов и практики.',
    source: 'Math Tools • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Casio' },
      { label: 'Тип', value: 'Научный калькулятор' },
      { label: 'Интерфейс', value: 'LCD' },
      { label: 'Назначение', value: 'Математика / инженерия' }
    ],
    specs: [
      { label: 'Возможности', value: 'Статистика, матрицы, интегралы' },
      { label: 'Память', value: 'Пользовательская' },
      { label: 'Питание', value: 'Батарейки' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Калькулятор', 'Инструкция', 'Коробка'],
    variants: [
      { name: 'Standard', price: 14500 },
      { name: 'Exam Edition', price: 15900 },
      { name: 'Scientific Plus', price: 17200 }
    ],
    reviews: [
      { user: 'Пользователь 30', title: 'Нужен для математики', text: 'Очень помогает на лекциях и экзаменах.', rating: 5 },
      { user: 'Покупатель', title: 'Проверенная модель', text: 'Удобен и понятен, особенно на технических курсах.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Проверенный калькулятор', text: 'Надежный и удобный алгоритм вычислений.', rating: 4 }
    ]
  },
  {
    id: 'p31',
    slug: 'samsung-galaxy-tab-s9',
    brand: 'Samsung',
    name: 'Galaxy Tab S9',
    model: '11" / Wi-Fi',
    category: 'Учебные товары',
    price: 249000,
    oldPrice: 289000,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 265,
    badge: 'Планшет',
    description: 'Samsung Galaxy Tab S9 — планшет для уроков, заметок, чтения и работы с документами, идеально подходит для дисциплин, где важен компактный и мощный экран.',
    source: 'Samsung Education • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9d1e82244?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585792180666-f9dca630c9a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Samsung' },
      { label: 'Экран', value: '11" AMOLED' },
      { label: 'ОС', value: 'Android' },
      { label: 'Назначение', value: 'Учёба / работа' }
    ],
    specs: [
      { label: 'Память', value: '128 ГБ' },
      { label: 'Процессор', value: 'Qualcomm Snapdragon' },
      { label: 'Батарея', value: '8400 мАч' },
      { label: 'Вес', value: '498 г' }
    ],
    packageIncludes: ['Планшет', 'Зарядное устройство', 'Кабель', 'Инструкция'],
    variants: [
      { name: '128GB Wi‑Fi', price: 249000 },
      { name: '256GB Wi‑Fi', price: 289000 },
      { name: '256GB + S Pen', price: 329000 }
    ],
    reviews: [
      { user: 'Пользователь 31', title: 'Удобен для чтения и лекций', text: 'Идеально для конспектов, учебных материалов и PDF.', rating: 5 },
      { user: 'Покупатель', title: 'Чёткий экран и хорошая батарея', text: 'Выглядит как хороший полезный ноутбук для повседневных задач.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Полезный инструмент', text: 'Подходит для компактной работы и обучения.', rating: 5 }
    ]
  },
  {
    id: 'p32',
    slug: 'apple-ipad-10',
    brand: 'Apple',
    name: 'iPad 10',
    model: '10.9" / 64GB',
    category: 'Учебные товары',
    price: 219000,
    oldPrice: 249000,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 209,
    badge: 'Apple',
    description: 'iPad 10 — универсальный планшет для учёбы, заметок, чтения и простых творческих задач. Отлично подходит для учебного процесса и мобильной работы.',
    source: 'Apple Education • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9d1e82244?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585792180666-f9dca630c9a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Apple' },
      { label: 'Экран', value: '10.9" Liquid Retina' },
      { label: 'ОС', value: 'iPadOS' },
      { label: 'Работа', value: 'С заметками и документами' }
    ],
    specs: [
      { label: 'Память', value: '64 ГБ' },
      { label: 'Процессор', value: 'A14 Bionic' },
      { label: 'Батарея', value: 'До 10 часов' },
      { label: 'Вес', value: '477 г' }
    ],
    packageIncludes: ['Планшет', 'USB-C зарядка', 'Документация'],
    variants: [
      { name: '64GB Wi‑Fi', price: 219000 },
      { name: '256GB Wi‑Fi', price: 279000 },
      { name: '256GB + Apple Pencil', price: 339000 }
    ],
    reviews: [
      { user: 'Пользователь 32', title: 'Удобный и быстрый', text: 'Отлично подходит для заметок, материалов и обучения в дороге.', rating: 5 },
      { user: 'Покупатель', title: 'Очень удобно для заданий', text: 'Хороший вариант для студентов и мобильной работы.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Планшет для работы и учебы', text: 'Подходит для чтения и созвездий учебных материалов.', rating: 5 }
    ]
  },
  {
    id: 'p33',
    slug: 'erich-krause-pencil-case',
    brand: 'Erich Krause',
    name: 'Pencil Case',
    model: 'Student Organizer',
    category: 'Учебные товары',
    price: 6200,
    oldPrice: 7500,
    currency: '₸',
    rating: 4.6,
    reviewsCount: 129,
    badge: 'Органайзер',
    description: 'Erich Krause Pencil Case — удобная и вместительная коробка для ручек, карандашей, линеек и инструмента, необходимого для учебного дня.',
    source: 'School Supply • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Erich Krause' },
      { label: 'Материал', value: 'Пластик' },
      { label: 'Объем', value: 'Средний' },
      { label: 'Назначение', value: 'Канцелярия' }
    ],
    specs: [
      { label: 'Отделения', value: 'Два' },
      { label: 'Цвет', value: 'Черный' },
      { label: 'Удобство', value: 'Компактное' },
      { label: 'Гарантия', value: '6 месяцев' }
    ],
    packageIncludes: ['Кейс', 'Инструкция'],
    variants: [
      { name: 'Classic Black', price: 6200 },
      { name: 'Navy', price: 6600 },
      { name: 'Rose', price: 6800 }
    ],
    reviews: [
      { user: 'Пользователь 33', title: 'Хорошая вместимость', text: 'Очень удобно хранить ручки, карандаши и мелочевку.', rating: 5 },
      { user: 'Покупатель', title: 'Качественный и аккуратный', text: 'Легко ложится в сумку, удобно использовать каждый день.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Нужен каждому студенту', text: 'Кнопка и отделения как раз для ежедневной канцелярии.', rating: 5 }
    ]
  },
  {
    id: 'p34',
    slug: 'staedtler-fineliner-set',
    brand: 'Staedtler',
    name: 'Fineliner Set',
    model: '10 Colors',
    category: 'Учебные товары',
    price: 8900,
    oldPrice: 10300,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 174,
    badge: 'Для заметок',
    description: 'Staedtler Fineliner Set — набор цветных ручек для заметок, схем, визуализации идей и учебных проектов.',
    source: 'Stationery Lab • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Staedtler' },
      { label: 'Тип', value: 'Маркер-ручка' },
      { label: 'Количество', value: '10 цветов' },
      { label: 'Назначение', value: 'Дизайн и заметки' }
    ],
    specs: [
      { label: 'Чернила', value: 'Водостойкие' },
      { label: 'Толщина', value: '0.4 мм' },
      { label: 'Цвет', value: 'Ассортимент' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Набор ручек', 'Упаковка'],
    variants: [
      { name: '10-pack', price: 8900 },
      { name: '20-pack', price: 14900 },
      { name: 'Premium', price: 17900 }
    ],
    reviews: [
      { user: 'Пользователь 34', title: 'Очень яркие и удобные', text: 'Подходит для планеров, схем, заметок и учебных иллюстраций.', rating: 5 },
      { user: 'Покупатель', title: 'Удобно для работы', text: 'Четкий цвет и аккуратная линия.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Набор на каждый день', text: 'Хорошо использовать в конспектах и мысли.', rating: 5 }
    ]
  },
  {
    id: 'p35',
    slug: 'stabilo-highlighter-set',
    brand: 'Stabilo',
    name: 'Highlighter Set',
    model: '6 Neon Colors',
    category: 'Учебные товары',
    price: 7400,
    oldPrice: 9000,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 165,
    badge: 'Тематические',
    description: 'Stabilo Highlighter Set — набор выделителей для структурирования заметок, учебных материалов и конспектов во время занятий.',
    source: 'Accent Stationery • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Stabilo' },
      { label: 'Тип', value: 'Выделитель' },
      { label: 'Количество', value: '6 цветов' },
      { label: 'Назначение', value: 'Конспектирование' }
    ],
    specs: [
      { label: 'Цвета', value: 'Неон' },
      { label: 'Плотность', value: 'Средняя' },
      { label: 'Покрытие', value: 'Блестящее' },
      { label: 'Материал', value: 'Пластик' }
    ],
    packageIncludes: ['Набор', 'Упаковка'],
    variants: [
      { name: '6 colors', price: 7400 },
      { name: '8 colors', price: 9200 },
      { name: '12 colors', price: 12100 }
    ],
    reviews: [
      { user: 'Пользователь 35', title: 'Очень удобно в конспектах', text: 'Делает заметки яснее и быстрее проходит поиск важного.', rating: 5 },
      { user: 'Покупатель', title: 'Нормально для ежедневной работы', text: 'Особенно удобно на парах и лекциях.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Полезный набор', text: 'Точно помогает выделять главное в тексте.', rating: 4 }
    ]
  },
  {
    id: 'p36',
    slug: 'whiteboard-marker-set',
    brand: 'Deli',
    name: 'Whiteboard Marker Set',
    model: '12 Colors',
    category: 'Учебные товары',
    price: 11200,
    oldPrice: 12900,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 142,
    badge: 'Для доски',
    description: 'Маркеры для доски помогают отмечать ключевые идеи, а также удобны для визуализации групповых проектов и презентаций.',
    source: 'Visual Tools • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Deli' },
      { label: 'Тип', value: 'Маркеры' },
      { label: 'Количество', value: '12 цветов' },
      { label: 'Назначение', value: 'Для доски' }
    ],
    specs: [
      { label: 'Чернила', value: 'Плотные' },
      { label: 'Толщина', value: '2 мм' },
      { label: 'Материал', value: 'Пластик' },
      { label: 'Гарантия', value: '6 месяцев' }
    ],
    packageIncludes: ['Набор', 'Упаковка'],
    variants: [
      { name: '12 colors', price: 11200 },
      { name: '8 colors', price: 9500 },
      { name: '20 colors', price: 16800 }
    ],
    reviews: [
      { user: 'Пользователь 36', title: 'Подходит для презентаций', text: 'Четко пишет на маркерной доске и быстро сохнет.', rating: 5 },
      { user: 'Покупатель', title: 'Удобный набор', text: 'Очень полезный для проектов, лекций и групповой работы.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Нужный для аудитории', text: 'Даже при активном использовании работает стабильно.', rating: 4 }
    ]
  },
  {
    id: 'p37',
    slug: '3m-sticky-notes-set',
    brand: '3M',
    name: 'Sticky Notes Set',
    model: '4 Colors',
    category: 'Учебные товары',
    price: 3900,
    oldPrice: 4800,
    currency: '₸',
    rating: 4.7,
    reviewsCount: 132,
    badge: 'Метки',
    description: '3M Sticky Notes — удобный набор заметок для пометок, планирования задач, быстрых напоминаний и организации рабочих материалов.',
    source: 'Office Supplies • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: '3M' },
      { label: 'Формат', value: 'Набор заметок' },
      { label: 'Цвета', value: '4 оттенка' },
      { label: 'Назначение', value: 'Метки / напоминания' }
    ],
    specs: [
      { label: 'Размер', value: '75 x 75 мм' },
      { label: 'Количество', value: '100 штук' },
      { label: 'Клейкость', value: 'Средняя' },
      { label: 'Материал', value: 'Бумага' }
    ],
    packageIncludes: ['Набор заметок', 'Упаковка'],
    variants: [
      { name: '4 colors', price: 3900 },
      { name: '8 colors', price: 5400 },
      { name: '12 colors', price: 6900 }
    ],
    reviews: [
      { user: 'Пользователь 37', title: 'Нужная мелочь для работы', text: 'Идеально для пометок в учебниках и рабочих заметках.', rating: 5 },
      { user: 'Покупатель', title: 'Хорошо держится', text: 'Ежедневно пользуюсь и все крепко держится.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Удобные заметки', text: 'Небольшие, но эффективные для планирования.', rating: 4 }
    ]
  },
  {
    id: 'p38',
    slug: 'study-clip-bundle',
    brand: 'OfficePro',
    name: 'Study Clip Bundle',
    model: 'Page Holders',
    category: 'Учебные товары',
    price: 5100,
    oldPrice: 6200,
    currency: '₸',
    rating: 4.6,
    reviewsCount: 118,
    badge: 'Лайфхак',
    description: 'Набор держателей для страниц и канцелярии делает работу с документами и учебниками значительно удобнее и аккуратнее.',
    source: 'Campus Tools • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'OfficePro' },
      { label: 'Тип', value: 'Клипсы / держатели' },
      { label: 'Материал', value: 'Пластик' },
      { label: 'Назначение', value: 'Для учебников' }
    ],
    specs: [
      { label: 'Количество', value: '12 шт.' },
      { label: 'Цвет', value: 'Многоцветный' },
      { label: 'Удобство', value: 'Легко закреплять' },
      { label: 'Гарантия', value: '6 месяцев' }
    ],
    packageIncludes: ['Набор клипс', 'Упаковка'],
    variants: [
      { name: '12 pcs', price: 5100 },
      { name: '24 pcs', price: 9600 },
      { name: 'Premium', price: 11900 }
    ],
    reviews: [
      { user: 'Пользователь 38', title: 'Супер полезно', text: 'Меньше ломаются закладки и заметки в учебниках.', rating: 5 },
      { user: 'Покупатель', title: 'Делаю аккуратнее', text: 'Подходит для учебников и тяжелых файлов.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Маленькая, но полезная вещь', text: 'Помогает быстро находить нужные места.', rating: 4 }
    ]
  },
  {
    id: 'p39',
    slug: 'usb-c-hub-7in1',
    brand: 'UGREEN',
    name: '7-in-1 USB-C Hub',
    model: '4K / PD 65W',
    category: 'Аксессуары',
    price: 18900,
    oldPrice: 21900,
    currency: '₸',
    rating: 4.8,
    reviewsCount: 265,
    badge: 'Нужный аксессуар',
    description: 'UGREEN 7-in-1 USB-C Hub — полезный адаптер для расширения портов ноутбука или планшета: HDMI, USB, зарядка и работа с внешними устройствами.',
    source: 'UGREEN Store • Алматы',
    availability: 'Быстрая доставка',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'UGREEN' },
      { label: 'Порты', value: '7 в 1' },
      { label: 'Тип', value: 'USB-C адаптер' },
      { label: 'Поддержка', value: '4K Output' }
    ],
    specs: [
      { label: 'HDMI', value: '4K@60Hz' },
      { label: 'Power Delivery', value: '65W' },
      { label: 'USB', value: '3x USB-A' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Хаб', 'USB-C кабель', 'Инструкция'],
    variants: [
      { name: '7-in-1', price: 18900 },
      { name: '10-in-1', price: 22900 },
      { name: 'Travel kit', price: 25900 }
    ],
    reviews: [
      { user: 'Пользователь 39', title: 'Много портов', text: 'Очень удобно, когда нужно подключить несколько устройств сразу.', rating: 5 },
      { user: 'Покупатель', title: 'Всё работает как надо', text: 'Надежный и практичный адаптер для ноутбука и планшета.', rating: 4 },
      { user: 'Демонстрационный отзыв', title: 'Очень удобен в поездках', text: 'Небольшой, функциональный и помогает с рабочими задачами.', rating: 5 }
    ]
  },
  {
    id: 'p40',
    slug: 'apple-magic-keyboard',
    brand: 'Apple',
    name: 'Magic Keyboard',
    model: 'Wireless / iPad',
    category: 'Аксессуары',
    price: 62900,
    oldPrice: 69900,
    currency: '₸',
    rating: 4.9,
    reviewsCount: 174,
    badge: 'Премиум',
    description: 'Apple Magic Keyboard — компактная и аккуратная клавиатура для iPad и других устройств, идеально подходит для тех, кто много пишет и работает в дороге.',
    source: 'Apple Accessory • Алматы',
    availability: 'На складе',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    details: [
      { label: 'Бренд', value: 'Apple' },
      { label: 'Тип', value: 'Беспроводная клавиатура' },
      { label: 'Подключение', value: 'Bluetooth' },
      { label: 'Назначение', value: 'Письмо и работа' }
    ],
    specs: [
      { label: 'Подсветка', value: 'Да' },
      { label: 'Поддержка', value: 'iPad, Mac' },
      { label: 'Батарея', value: 'До 1 месяца' },
      { label: 'Гарантия', value: '12 месяцев' }
    ],
    packageIncludes: ['Клавиатура', 'USB-C кабель', 'Инструкция'],
    variants: [
      { name: 'White', price: 62900 },
      { name: 'Black', price: 64900 },
      { name: 'Pro', price: 69900 }
    ],
    reviews: [
      { user: 'Пользователь 40', title: 'Отлично для заметок и работы', text: 'Письмо комфортное, аккуратное и стабильное.', rating: 5 },
      { user: 'Покупатель', title: 'Премиальный комплект', text: 'В поездках и дома удобно. Приятно работать с планшетом.', rating: 5 },
      { user: 'Демонстрационный отзыв', title: 'Надежный и удобный', text: 'Модель выглядит дорогой и работает без задержек.', rating: 5 }
    ]
  }
];

export const getProductBySlug = (slug: string) => MARKET_PRODUCTS.find((product) => product.slug === slug) ?? null;

export { fallbackImage };

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: 'Академия' | 'Образование' | 'Наука' | 'Спорт' | 'IT' | 'Кибербезопасность' | 'Мероприятия';
  date: string;
  readTime: string;
  image: string;
  summary: string;
  shortDescription: string;
  content: string;
  source: string;
}

export const NEWS_CATEGORIES = ['Все', 'Академия', 'Образование', 'Наука', 'Спорт', 'IT', 'Кибербезопасность', 'Мероприятия'] as const;

export const NEWS_MOCK: NewsItem[] = [
  {
    id: 'n1',
    slug: 'laboratoriya-kiberpoligona',
    title: 'Открытие лаборатории киберполигона в Академии',
    category: 'Академия',
    date: '2026-09-19',
    readTime: '3 мин',
    image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
    summary: 'В рамках модернизации учебной базы запущен учебный киберполигон и вычислительный кластер для практики защитных сценариев.',
    shortDescription: 'Новый учебный киберполигон поможет студентам отрабатывать реальные сценарии защиты цифровых систем.',
    content: 'В рамках модернизации учебной материально-технической базы состоялось торжественное открытие учебно-исследовательской лаборатории киберполигона.\n\nКомплекс оснащён современными серверными стойками, аппаратными генераторами сетевого трафика и изолированными виртуальными средами для моделирования атак и отработки защитных сценариев.\n\nРуководство Академии отметило, что такой формат подготовки позволяет студентам закреплять теоретические знания на реальных архитектурах и сценариях, приближенных к профессиональной практике.\n\nНа открытии также прошли демонстрационные сессии, где участники увидели, как выглядит работа SOC-центра, адаптация сетевых политик и анализ инцидентов в защищённой среде.',
    source: 'Демонстрационный источник: QALQAN Academy'
  },
  {
    id: 'n2',
    slug: 'qalqan-hakaton-kiberbezopasnost',
    title: 'Команда QALQAN заняла первое место на хакатоне по кибербезопасности',
    category: 'Кибербезопасность',
    date: '2026-09-16',
    readTime: '4 мин',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    summary: 'Студенческая команда успешно защитила сервисы, провела анализ инцидентов и выполнила кейс по расследованию угроз.',
    shortDescription: 'Команда Академии победила в национальном турнире по кибербезопасности и защите цифровых сервисов.',
    content: 'Сборная команда студентов Академии одержала уверенную победу в финале национального хакатона по кибербезопасности.\n\nВ течение 48 часов участники решали задачи по обнаружению сетевых атак, расследованию инцидентов, анализу уязвимостей и реверс-инжинирингу.\n\nОсобенно сильной оказалась работа команды над эскалацией инцидентов: участники быстро определили вектор угрозы, изолировали компрометированные сервисы и предложили устойчивый план защиты.\n\nКоманда также презентовала рекомендации по практической кибергигиене и устойчивости образовательных систем к внешним атакам.',
    source: 'Демонстрационный источник: QALQAN Security Lab'
  },
  {
    id: 'n3',
    slug: 'osennee-pervenstvo-po-sambo',
    title: 'Старт осеннего первенства Академии по самбо и рукопашному бою',
    category: 'Спорт',
    date: '2026-09-14',
    readTime: '2 мин',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80',
    summary: 'Соревнования среди студентов и курсантов соберут более 180 участников в спорткомплексе Академии.',
    shortDescription: 'Осенний спортивный турнир объединяет студентов разных курсов в дисциплинах самбо и рукопашного боя.',
    content: 'В спортивном комплексе Академии стартовало осеннее первенство по самбо и рукопашному бою.\n\nСоревнования соберут более 180 участников: от начинающих студентов до опытных курсантов и активистов клубов физической подготовки.\n\nОрганизаторы подчеркивают, что программа турнира направлена не только на результат, но и на физическую дисциплину, командный дух и развитие спортивной культуры внутри учебного сообщества.\n\nПравила и форматы матчей подготовлены с учетом возрастных и уровневых категорий, а для лучших участников предусмотрены приглашения в сборную Академии.',
    source: 'Демонстрационный источник: Спортивный центр QALQAN'
  },
  {
    id: 'n4',
    slug: 'standarty-akademicheskoy-chestnosti',
    title: 'Обновлены стандарты академической честности и цифровых экзаменов',
    category: 'Образование',
    date: '2026-09-10',
    readTime: '3 мин',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    summary: 'В учебном процессе внедрены новые правила проверки работ, открытые портфолио и прозрачные процедуры оценки.',
    shortDescription: 'Новые стандарты повышают прозрачность и цифровую дисциплину в учебных и исследовательских задачах.',
    content: 'Учебный совет Академии утвердил обновленный регламент академической честности и проверки курсовых и исследовательских работ.\n\nВ документе закреплены новые правила проверки через антиплагиат, электронную фиксацию этапов выполнения проекта и прозрачную регистрацию результата.\n\nТакже предусмотрены цифровые портфолио студентов, в которых можно хранить результаты обучения, проектные работы и выступления на конференциях.\n\nПо словам преподавателей, такой подход помогает формировать ответственную и зрелую образовательную культуру и снижает риски несанкционированного копирования.',
    source: 'Демонстрационный источник: Учебный совет QALQAN'
  },
  {
    id: 'n5',
    slug: 'govtech-3-0-i-zashchita-dannykh',
    title: 'Казахстан развивает стандарты защищенного обмена данными в модели GovTech 3.0',
    category: 'IT',
    date: '2026-09-08',
    readTime: '5 мин',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    summary: 'Эксперты обсуждают адаптацию цифровых государственные сервисов и защиту данных в условиях роста онлайн-услуг.',
    shortDescription: 'Новый этап цифровизации предполагает защиту публичных сервисов, открытых API и данных граждан.',
    content: 'Эксперты обсудили развитие цифровой инфраструктуры Казахстана и переход к модели проактивного государства GovTech 3.0.\n\nОсобое внимание уделено защите персональных данных, отказоустойчивости сервисов eGov и развитию безопасной архитектуры цифровых платформ.\n\nВ проекте принимает участие и образовательный блок: студенты профильных направлений участвуют в тестировании прототипов открытых API и сценариев проверки доступности систем.\n\nПереход к более зрелой архитектуре цифровых госуслуг требует не только масштабных интеграций, но и продуманного подхода к безопасности и устойчивости.',
    source: 'Демонстрационный источник: Digital Kazakhstan Lab'
  },
  {
    id: 'n6',
    slug: 'nauchnyj-seminar-po-ai',
    title: 'Научный семинар по искусственному интеллекту и этике данных открыл сезон осени',
    category: 'Наука',
    date: '2026-09-05',
    readTime: '4 мин',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    summary: 'В Академии прошел семинар, посвященный безопасному развитию ИИ, принципам прозрачности и аналитике данных.',
    shortDescription: 'Семинар объединил студентов, исследователей и экспертов в области ИИ, данных и этики технологий.',
    content: 'В стенах Академии состоялся научный семинар на тему искусственного интеллекта, этики данных и безопасного внедрения алгоритмов в повседневные процессы.\n\nМодераторы подчеркнули, что развитие ИИ невозможно без прозрачности моделей, проверки данных и устойчивости пользовательских решений.\n\nВ рамках семинара были представлены кейсы по рекомендательным системам, анализу текстов и автоматизированной обработке информации в образовании.\n\nДля студентов это стало важным этапом в формировании критического мышления и понимания ограничений современных систем генеративного ИИ.',
    source: 'Демонстрационный источник: QALQAN Research Hub'
  },
  {
    id: 'n7',
    slug: 'start-priemnoi-kampanii-2027',
    title: 'Старт приемной кампании 2027 года: открытые дни и онлайн-экскурсии',
    category: 'Мероприятия',
    date: '2026-09-02',
    readTime: '3 мин',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    summary: 'Абитуриенты смогут посещать виртуальные встречи, знакомиться с программами и получать консультации от преподавателей.',
    shortDescription: 'Пробный набор мероприятий помогает абитуриентам выбрать направление до подачи заявки.',
    content: 'Академия объявила старт приемной кампании 2027 года. В программе кампании — открытые дни, онлайн-экскурсии, встречи с преподавателями и представителями студенческих программ.\n\nИнформация о направлениях обучения будет размещена в цифровом портале, а для учащихся школ предусмотрены онлайн-консультации по выбору специальностей.\n\nДиректор по академическим программам подчеркнула, что главное для абитуриентов — не только выбрать программу, но и убедиться в том, что направление соответствует их интересам и будущим карьерным задачам.\n\nВ ближайшие недели один из ключевых акцентов станет на цифровой интерактивной навигации по кампусам и лабораториям Академии.',
    source: 'Демонстрационный источник: Admissions Office'
  }
];

export const getNewsBySlug = (slug: string): NewsItem | null =>
  NEWS_MOCK.find((item) => item.slug === slug) ?? null;

export const getRelatedNews = (slug: string, category: NewsItem['category']) =>
  NEWS_MOCK.filter((item) => item.slug !== slug && item.category === category).slice(0, 3);

export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SECURITY_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Фишинг и социальная инженерия',
    question: 'Вам пришло письмо якобы от деканата со ссылкой «Срочно подтвердите свои учетные данные для доступа к сессии». Домен отправителя выглядит как «portal-akademia-login.com». Ваши действия?',
    options: [
      'Быстро ввести свой логин и пароль, чтобы не потерять доступ',
      'Не переходить по ссылке, проверить официальный адрес сервиса и сообщить в IT-службу',
      'Переслать письмо одногруппникам, чтобы они тоже успели авторизоваться',
      'Ответить на письмо с вопросом: «Вы настоящий деканат?»'
    ],
    correctIndex: 1,
    explanation: 'Это классический фишинг. Службы Академии никогда не требуют срочного ввода паролей через сторонние подозрительные домены.'
  },
  {
    id: 2,
    topic: 'Двухфакторная аутентификация (2FA)',
    question: 'Какой метод второго фактора аутентификации является наиболее защищенным от атак типа SIM-swapping и перехвата?',
    options: [
      'SMS-сообщение на номер мобильного телефона',
      'Одноразовый код из приложения-аутентификатора (TOTP) или аппаратный ключ FIDO2/U2F',
      'Звонок автоинформатора',
      'Секретный вопрос (девичья фамилия матери)'
    ],
    correctIndex: 1,
    explanation: 'TOTP-приложения и аппаратные ключи безопасности работают локально или криптографически привязаны к устройству и не уязвимы для перехвата по сотовой сети.'
  },
  {
    id: 3,
    topic: 'Парольная гигиена',
    question: 'Какой из следующих паролей является наиболее криптостойким и безопасным?',
    options: [
      'Qalqan2026!',
      'qwerty123456',
      'Kokshetau-Astana-Beket-8492#',
      'Password#1'
    ],
    correctIndex: 2,
    explanation: 'Длинная парольная фраза из несвязанных слов со спецсимволами и цифрами обладает колоссальной энтропией и устойчива к перебору по словарям.'
  },
  {
    id: 4,
    topic: 'Публичные сети Wi-Fi',
    question: 'Вы находитесь на вокзале или в кафе и подключаетесь к открытому общественному Wi-Fi без пароля. Что необходимо сделать перед входом в учебный кабинет?',
    options: [
      'Ничего, современные браузеры сами полностью защищают от любых атак',
      'Использовать защищенный зашифрованный VPN-туннель и убедиться в наличии HTTPS/HSTS',
      'Отключить антивирус, чтобы интернет работал быстрее',
      'Разрешить общий доступ к файлам на вашем ноутбуке'
    ],
    correctIndex: 1,
    explanation: 'В открытых сетях злоумышленники могут перехватывать незашифрованный трафик или осуществлять атаку Man-in-the-Middle (MitM).'
  },
  {
    id: 5,
    topic: 'Персональные данные и eGov',
    question: 'Вам звонят в мессенджере с аватаром государственного органа и просят продиктовать SMS-код от сервиса 1414 «для защиты аккаунта». Что делать?',
    options: [
      'Немедленно прекратить разговор. Настоящие сотрудники госорганов никогда не запрашивают коды из SMS 1414',
      'Продиктовать код, так как звонят с логотипом службы',
      'Спросить звание звонящего и после этого назвать код',
      'Назвать пароль от личного кабинета'
    ],
    correctIndex: 0,
    explanation: 'Код от номера 1414 предназначен исключительно для подтверждения ваших личных действий. Передача его третьим лицам компрометирует доступ к вашим государственным услугам.'
  }
];

export interface NotificationItem {
  id: string;
  category: 'Учёба' | 'Академия' | 'Market' | 'Сервисы' | 'Безопасность';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'Учёба',
    title: 'Изменено расписание занятия',
    body: 'Лекция по Информационной безопасности перенесена в аудиторию 304 на 14:00.',
    time: '20 минут назад',
    read: false
  },
  {
    id: 'n2',
    category: 'Учёба',
    title: 'Новое задание по математике',
    body: 'Опубликована расчетная работа по теме «Дифференциальные уравнения». Срок сдачи: 28 сентября.',
    time: '2 часа назад',
    read: false
  },
  {
    id: 'n3',
    category: 'Безопасность',
    title: 'Плановая смена пароля',
    body: 'Рекомендуется обновить постоянный пароль к учетной записи QALQAN ID в рамках цифровой гигиены.',
    time: '1 день назад',
    read: false
  },
  {
    id: 'n4',
    category: 'Market',
    title: 'Поступление новой экипировки',
    body: 'В каталог QALQAN Market добавлены рюкзаки Pro и фирменные блокноты Академии.',
    time: '2 дня назад',
    read: true
  },
  {
    id: 'n5',
    category: 'Сервисы',
    title: 'График работы спорткомплекса',
    body: 'Запись на секции рукопашного боя и плавания открыта через раздел Сервисы.',
    time: '3 дня назад',
    read: true
  }
];

export interface DiningItem {
  id: string;
  type: 'Завтрак' | 'Обед' | 'Ужин';
  name: string;
  description: string;
  calories: string;
  price: number;
}

export const DINING_MENU: DiningItem[] = [
  {
    id: 'd1',
    type: 'Обед',
    name: 'Комплексный рацион №1 «Курсантский»',
    description: 'Борщ сибирский со сметаной, бифштекс с яйцом, картофельное пюре, салат из свежих овощей, компот из сухофруктов.',
    calories: '890 ккал',
    price: 1800
  },
  {
    id: 'd2',
    type: 'Обед',
    name: 'Комплексный рацион №2 «Спортивный»',
    description: 'Куриный суп с домашней лапшой, филе индейки на пару с диким рисом, витаминный салат из моркови и яблок, морс.',
    calories: '740 ккал',
    price: 1950
  },
  {
    id: 'd3',
    type: 'Завтрак',
    name: 'Завтрак «Энергия»',
    description: 'Овсяная каша с курагой и мёдом, омлет с сыром, тост из цельнозернового хлеба, чай с лимоном.',
    calories: '520 ккал',
    price: 1100
  },
  {
    id: 'd4',
    type: 'Ужин',
    name: 'Ужин «Баланс»',
    description: 'Рыбное филе запеченное с травами, тушеные овощи, греческий салат, кефир.',
    calories: '610 ккал',
    price: 1650
  }
];

