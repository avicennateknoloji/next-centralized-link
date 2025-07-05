/**
 * Next.js için merkezileştirilmiş link yönetimi
 * Route tanımlarını tek yerden yönetmek için kullanılır
 */

type Slug = string;
type RouteParams = Record<string, string | number | undefined>;
type CentralizedLinkFunction = (params?: RouteParams) => string;
type Links = Record<Slug, CentralizedLinkFunction>;

const links: Links = {};

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
 * // Parametreli route
 * centralizedLink('user', ({ id }) => `/user/${id}`);
 * 
 * // Sorgu parametreli route
 * centralizedLink('search', ({ q, page = 1 }) => `/search?q=${q}&page=${page}`);
 * ```
 */
const centralizedLink = (
  key: Slug,
  value: CentralizedLinkFunction,
): void => {
  links[key] = value;
};

/**
 * Tanımlanan route'u alır
 * @param key - Route anahtarı
 * @param params - Route parametreleri
 * @returns Route URL'si
 * 
 * @example
 * ```ts
 * const userUrl = getLink('user', { id: 123 }); // '/user/123'
 * ```
 */
const getLink = (key: Slug, params?: RouteParams): string => {
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
const hasLink = (key: Slug): boolean => {
  return key in links;
};

export { 
  centralizedLink, 
  getLink, 
  getDefinedLinks, 
  hasLink, 
  links 
};

export type { 
  Slug, 
  RouteParams, 
  CentralizedLinkFunction, 
  Links 
};