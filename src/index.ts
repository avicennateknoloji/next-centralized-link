/**
 * Next.js için merkezileştirilmiş link yönetimi
 * Route tanımlarını tek yerden yönetmek için kullanılır
 */

type Slug = string | number;
type RouteParams = Record<string, string | number | undefined>;
type CentralizedLinkFunction = (params?: RouteParams | Slug) => string;
type LinkConfig = Record<string, CentralizedLinkFunction>;


class CentralizedLink {
  links: Record<string, CentralizedLinkFunction> = {};
  static centralizedLinkClass: CentralizedLink | null = null;
  constructor() {
    this.links = {};
    CentralizedLink.centralizedLinkClass = this;
  }
  initialize(config: LinkConfig) {
    this.links = config;
  }
  static getLinks() {
    return CentralizedLink.centralizedLinkClass?.links || {};
  }
  
  static getInstance() {
    if (!CentralizedLink.centralizedLinkClass) {
      CentralizedLink.centralizedLinkClass = new CentralizedLink();
    }
    return CentralizedLink.centralizedLinkClass;
  }
}


// Links objesi - direkt fonksiyon çağrısı için
const links: Record<string, CentralizedLinkFunction> = {};

/**
 * Tüm linkleri toplu olarak yapılandırır
 * Uygulama başlamadan önce tüm route'ları tanımlamak için kullanılır
 * @param config - Route yapılandırma objesi
 * 
 * @example
 * ```ts
 * configureLinks({
 *   home: () => '/',
 *   regions: () => '/vizeler/bolgeler',
 *   region: (slug: Slug) => `/vizeler/bolge/${slug}`,
 *   visas: () => '/vizeler',
 *   visa: (slug: Slug) => `/vize/${slug}`,
 *   contact: () => '/iletisim',
 *   turlar: () => '/turlar',
 *   tur: (slug: Slug) => `/tur/${slug}`,
 * });
 * 
 * // Kullanım:
 * <a href={links.visas()}>Vizeler</a>
 * <a href={links.region(slugify(country.slug))}>Bölge</a>
 * ```
 */
const configureLinks = (config: LinkConfig): void => {
  // Mevcut linkleri temizle
  Object.keys(links).forEach(key => {
    delete links[key];
  });
  
  // Yeni linkleri ekle
  Object.entries(config).forEach(([key, value]) => {
    links[key] = value;
  });
};

/**
 * Yeni bir route tanımı ekler
 * @param key - Route'un benzersiz anahtarı
 * @param value - Route'u oluşturan fonksiyon
 * 
 * @example
 * ```ts
 * // Basit route
 * centralizedLink('home', () => '/');
 * 
 * // Parametreli route (obje ile)
 * centralizedLink('user', ({ id }) => `/user/${id}`);
 * 
 * // Parametreli route (slug ile)
 * centralizedLink('region', (slug: Slug) => `/vizeler/bolge/${slug}`);
 * 
 * // Sorgu parametreli route
 * centralizedLink('search', ({ q, page = 1 }) => `/search?q=${q}&page=${page}`);
 * 
 * // Kullanım:
 * links.home() // '/'
 * links.region('avrupa') // '/vizeler/bolge/avrupa'
 * ```
 */
const centralizedLink = (
  key: string,
  value: CentralizedLinkFunction,
): void => {
  links[key] = value;
};

/**
 * Tanımlanan route'u alır
 * @param key - Route anahtarı
 * @param params - Route parametreleri (obje veya slug)
 * @returns Route URL'si
 * 
 * @example
 * ```ts
 * const userUrl = getLink('user', { id: 123 }); // '/user/123'
 * const regionUrl = getLink('region', 'avrupa'); // '/vizeler/bolge/avrupa'
 * 
 * // Artık direkt de kullanabilirsiniz:
 * const userUrl = links.user({ id: 123 }); // '/user/123'
 * const regionUrl = links.region('avrupa'); // '/vizeler/bolge/avrupa'
 * ```
 */
const getLink = (key: string, params?: RouteParams | Slug): string => {
  const linkFunction = links[key];
  if (!linkFunction) {
    throw new Error(`Link "${key}" tanımlanmamış. Önce centralizedLink ile tanımlayın.`);
  }
  return linkFunction(params);
};

/**
 * Tüm tanımlanan route'ları listeler
 * @returns Tanımlanan route anahtarları
 */
const getDefinedLinks = (): string[] => {
  return Object.keys(links);
};

/**
 * Belirli bir route'un tanımlı olup olmadığını kontrol eder
 * @param key - Route anahtarı
 * @returns Route tanımlı mı?
 */
const hasLink = (key: string): boolean => {
  return key in links;
};

export { 
  centralizedLink, 
  getLink, 
  getDefinedLinks, 
  hasLink, 
  configureLinks,
  links,
  CentralizedLink,
};

export type { 
  Slug, 
  RouteParams, 
  CentralizedLinkFunction, 
  LinkConfig 
};