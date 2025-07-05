# Next.js Centralized Link

Next.js projelerinde route tanımlarını merkezileştirilmiş bir şekilde yönetmek için kullanılan TypeScript paketi.

## 🚀 Kurulum

```bash
npm install @avicennatechnology/next-centralized-link
```

```bash
yarn add @avicennatechnology/next-centralized-link
```

```bash
pnpm add @avicennatechnology/next-centralized-link
```

## 📖 Kullanım

### Temel Kullanım

```typescript
import { centralizedLink, getLink } from '@avicennatechnology/next-centralized-link';

// Route tanımları
centralizedLink('home', () => '/');
centralizedLink('about', () => '/about');
centralizedLink('contact', () => '/contact');

// Link kullanımı
const homeUrl = getLink('home'); // '/'
const aboutUrl = getLink('about'); // '/about'
```

### Parametreli Route'lar

```typescript
import { centralizedLink, getLink } from '@avicennatechnology/next-centralized-link';

// Parametreli route tanımları
centralizedLink('user', ({ id }) => `/user/${id}`);
centralizedLink('post', ({ slug }) => `/blog/${slug}`);
centralizedLink('category', ({ category, page = 1 }) => `/category/${category}?page=${page}`);

// Kullanım
const userUrl = getLink('user', { id: 123 }); // '/user/123'
const postUrl = getLink('post', { slug: 'my-post' }); // '/blog/my-post'
const categoryUrl = getLink('category', { category: 'tech', page: 2 }); // '/category/tech?page=2'
```

### Next.js Link Component'i ile Kullanım

```tsx
import Link from 'next/link';
import { getLink } from '@avicennatechnology/next-centralized-link';

function Navigation() {
  return (
    <nav>
      <Link href={getLink('home')}>Ana Sayfa</Link>
      <Link href={getLink('about')}>Hakkında</Link>
      <Link href={getLink('user', { id: 123 })}>Kullanıcı Profili</Link>
    </nav>
  );
}
```

### Router ile Kullanım

```tsx
import { useRouter } from 'next/router';
import { getLink } from '@avicennatechnology/next-centralized-link';

function MyComponent() {
  const router = useRouter();
  
  const handleNavigation = () => {
    router.push(getLink('user', { id: 456 }));
  };
  
  return (
    <button onClick={handleNavigation}>
      Kullanıcı Profiline Git
    </button>
  );
}
```

## 🔧 API Referansı

### `centralizedLink(key, linkFunction)`

Yeni bir route tanımı ekler.

**Parametreler:**
- `key` (string): Route'un benzersiz anahtarı
- `linkFunction` (function): Route'u oluşturan fonksiyon

**Örnek:**
```typescript
centralizedLink('user', ({ id }) => `/user/${id}`);
```

### `getLink(key, params?)`

Tanımlanan route'u alır.

**Parametreler:**
- `key` (string): Route anahtarı
- `params` (object, opsiyonel): Route parametreleri

**Döndürür:** string - Route URL'si

**Örnek:**
```typescript
const url = getLink('user', { id: 123 }); // '/user/123'
```

### `hasLink(key)`

Belirli bir route'un tanımlı olup olmadığını kontrol eder.

**Parametreler:**
- `key` (string): Route anahtarı

**Döndürür:** boolean

**Örnek:**
```typescript
const exists = hasLink('user'); // true veya false
```

### `getDefinedLinks()`

Tüm tanımlanan route'ları listeler.

**Döndürür:** string[] - Tanımlanan route anahtarları

**Örnek:**
```typescript
const allLinks = getDefinedLinks(); // ['home', 'about', 'user', ...]
```

## 💡 Örnekler

### E-ticaret Sitesi Route'ları

```typescript
import { centralizedLink, getLink } from '@avicennatechnology/next-centralized-link';

// Route tanımları
centralizedLink('home', () => '/');
centralizedLink('products', () => '/products');
centralizedLink('product', ({ id }) => `/product/${id}`);
centralizedLink('category', ({ slug }) => `/category/${slug}`);
centralizedLink('cart', () => '/cart');
centralizedLink('checkout', () => '/checkout');
centralizedLink('user', ({ id }) => `/user/${id}`);
centralizedLink('orders', ({ userId }) => `/user/${userId}/orders`);

// Kullanım örnekleri
const productUrl = getLink('product', { id: 'abc123' }); // '/product/abc123'
const categoryUrl = getLink('category', { slug: 'electronics' }); // '/category/electronics'
const ordersUrl = getLink('orders', { userId: 456 }); // '/user/456/orders'
```

### Blog Route'ları

```typescript
centralizedLink('blog', () => '/blog');
centralizedLink('post', ({ slug }) => `/blog/${slug}`);
centralizedLink('author', ({ username }) => `/author/${username}`);
centralizedLink('tag', ({ tag }) => `/tag/${tag}`);
centralizedLink('archive', ({ year, month }) => `/archive/${year}/${month}`);

// Kullanım
const postUrl = getLink('post', { slug: 'nextjs-tips' }); // '/blog/nextjs-tips'
const authorUrl = getLink('author', { username: 'johndoe' }); // '/author/johndoe'
const archiveUrl = getLink('archive', { year: 2023, month: 12 }); // '/archive/2023/12'
```

## 🛡️ TypeScript Desteği

Bu paket tam TypeScript desteği ile gelir:

```typescript
import type { RouteParams, CentralizedLinkFunction } from '@avicennatechnology/next-centralized-link';

// Tip güvenli route tanımları
const userRoute: CentralizedLinkFunction = ({ id }: RouteParams) => `/user/${id}`;
centralizedLink('user', userRoute);
```

## 🎯 Avantajlar

- **Merkezileştirilmiş Yönetim**: Tüm route'lar tek yerden yönetilir
- **Tip Güvenliği**: Full TypeScript desteği
- **Kolay Refaktoring**: Route değişiklikleri tek yerden yapılır
- **Hata Azaltma**: Yanlış URL yazma riskini minimuma indirir
- **Next.js Uyumluluğu**: Hem App Router hem Pages Router ile uyumlu

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen pull request göndermeden önce issue açın.

---

Bu paket Next.js projelerinde route yönetimini kolaylaştırmak için tasarlanmıştır. Herhangi bir sorunuz varsa issue açmaktan çekinmeyin! 