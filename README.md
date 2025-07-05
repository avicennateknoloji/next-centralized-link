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

### Temel Kullanım (Önerilen)

```typescript
import { configureLinks, links } from '@avicennatechnology/next-centralized-link';

// Tüm route'ları tek seferde yapılandırın
configureLinks({
  home: () => '/',
  about: () => '/about',
  contact: () => '/contact',
  visas: () => '/vizeler',
  region: (slug) => `/vizeler/bolge/${slug}`,
});

// Direkt kullanım
const homeUrl = links.home(); // '/'
const visasUrl = links.visas(); // '/vizeler'
const regionUrl = links.region('avrupa'); // '/vizeler/bolge/avrupa'
```

### JSX ile Kullanım

```tsx
import { configureLinks, links } from '@avicennatechnology/next-centralized-link';

// Route konfigürasyonu
configureLinks({
  home: () => '/',
  visas: () => '/vizeler',
  region: (slug) => `/vizeler/bolge/${slug}`,
  visa: (slug) => `/vize/${slug}`,
});

function Navigation({ country }) {
  return (
    <nav>
      <a href={links.home()}>Ana Sayfa</a>
      <a href={links.visas()}>Vizeler</a>
      <a href={links.region(slugify(country.slug))}>Bölge</a>
    </nav>
  );
}
```

### Next.js Link Component'i ile Kullanım

```tsx
import Link from 'next/link';
import { links } from '@avicennatechnology/next-centralized-link';

function Navigation({ country }) {
  return (
    <nav>
      <Link href={links.home()}>Ana Sayfa</Link>
      <Link href={links.visas()}>Vizeler</Link>
      <Link href={links.region(slugify(country.slug))}>Bölge</Link>
    </nav>
  );
}
```

### Router ile Kullanım

```tsx
import { useRouter } from 'next/router';
import { links } from '@avicennatechnology/next-centralized-link';

function MyComponent({ countrySlug }) {
  const router = useRouter();
  
  const handleNavigation = () => {
    router.push(links.region(countrySlug));
  };
  
  return (
    <button onClick={handleNavigation}>
      Bölgeye Git
    </button>
  );
}
```

### Alternatif Kullanım (Tekli Ekleme)

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
import { configureLinks, links } from '@avicennatechnology/next-centralized-link';

// Parametreli route tanımları
configureLinks({
  home: () => '/',
  user: ({ id }) => `/user/${id}`,
  post: ({ slug }) => `/blog/${slug}`,
  category: ({ category, page = 1 }) => `/category/${category}?page=${page}`,
  // Slug parametresi (daha basit kullanım)
  region: (slug) => `/vizeler/bolge/${slug}`,
  visa: (slug) => `/vize/${slug}`,
});

// Kullanım
const userUrl = links.user({ id: 123 }); // '/user/123'
const postUrl = links.post({ slug: 'my-post' }); // '/blog/my-post'
const categoryUrl = links.category({ category: 'tech', page: 2 }); // '/category/tech?page=2'
const regionUrl = links.region('turkiye'); // '/vizeler/bolge/turkiye'
const visaUrl = links.visa('abd-vizesi'); // '/vize/abd-vizesi'
```

## 🔧 API Referansı

### `configureLinks(config)`

Tüm route'ları tek seferde yapılandırır. **Önerilen yöntem**.

**Parametreler:**
- `config` (object): Route yapılandırma objesi

**Örnek:**
```typescript
configureLinks({
  home: () => '/',
  visas: () => '/vizeler',
  region: (slug) => `/vizeler/bolge/${slug}`,
});
```

### `links` objesi

Yapılandırılmış route'lara direkt erişim sağlar.

**Örnek:**
```typescript
const url = links.region('avrupa'); // '/vizeler/bolge/avrupa'
```

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

### Vize Sitesi Route'ları

```typescript
import { configureLinks, links } from '@avicennatechnology/next-centralized-link';

// Route tanımları
configureLinks({
  home: () => '/',
  visas: () => '/vizeler',
  regions: () => '/vizeler/bolgeler',
  region: (slug) => `/vizeler/bolge/${slug}`,
  visa: (slug) => `/vize/${slug}`,
  contact: () => '/iletisim',
  about: () => '/hakkimizda',
  services: () => '/hizmetler',
  service: (slug) => `/hizmet/${slug}`,
});

// Kullanım örnekleri
const visasUrl = links.visas(); // '/vizeler'
const regionUrl = links.region('avrupa'); // '/vizeler/bolge/avrupa'
const visaUrl = links.visa('schengen-vizesi'); // '/vize/schengen-vizesi'
```

### E-ticaret Sitesi Route'ları

```typescript
configureLinks({
  home: () => '/',
  products: () => '/products',
  product: ({ id }) => `/product/${id}`,
  category: ({ slug }) => `/category/${slug}`,
  cart: () => '/cart',
  checkout: () => '/checkout',
  user: ({ id }) => `/user/${id}`,
  orders: ({ userId }) => `/user/${userId}/orders`,
});

// Kullanım örnekleri
const productUrl = links.product({ id: 'abc123' }); // '/product/abc123'
const categoryUrl = links.category({ slug: 'electronics' }); // '/category/electronics'
const ordersUrl = links.orders({ userId: 456 }); // '/user/456/orders'
```

### Blog Route'ları

```typescript
configureLinks({
  blog: () => '/blog',
  post: (slug) => `/blog/${slug}`,
  author: (username) => `/author/${username}`,
  tag: (tag) => `/tag/${tag}`,
  archive: ({ year, month }) => `/archive/${year}/${month}`,
});

// Kullanım
const postUrl = links.post('nextjs-tips'); // '/blog/nextjs-tips'
const authorUrl = links.author('johndoe'); // '/author/johndoe'
const archiveUrl = links.archive({ year: 2023, month: 12 }); // '/archive/2023/12'
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
- **Direkt Kullanım**: `links.visas()` şeklinde direkt erişim
- **Esnek Parametreler**: Hem obje hem de slug parametresi desteği

## 🔄 Migrasyon

Eğer mevcut `getLink` kullanımından geçiş yapıyorsanız:

```typescript
// Eski kullanım
const url = getLink('region', 'avrupa');

// Yeni kullanım
const url = links.region('avrupa');
```

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen pull request göndermeden önce issue açın.

---

Bu paket Next.js projelerinde route yönetimini kolaylaştırmak için tasarlanmıştır. Herhangi bir sorunuz varsa issue açmaktan çekinmeyin! 