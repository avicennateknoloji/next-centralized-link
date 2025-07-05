/**
 * Next.js için merkezileştirilmiş link yönetimi
 * Route tanımlarını tek yerden yönetmek için kullanılır
 */
type Slug = string;
type RouteParams = Record<string, string | number | undefined>;
type CentralizedLinkFunction = (params?: RouteParams) => string;
type Links = Record<Slug, CentralizedLinkFunction>;
declare const links: Links;
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
declare const centralizedLink: (key: Slug, value: CentralizedLinkFunction) => void;
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
declare const getLink: (key: Slug, params?: RouteParams) => string;
/**
 * Tüm tanımlanan route'ları listeler
 * @returns Tanımlanan route anahtarları
 */
declare const getDefinedLinks: () => string[];
/**
 * Belirli bir route'un tanımlı olup olmadığını kontrol eder
 * @param key - Route anahtarı
 * @returns Route tanımlı mı?
 */
declare const hasLink: (key: Slug) => boolean;

export { type CentralizedLinkFunction, type Links, type RouteParams, type Slug, centralizedLink, getDefinedLinks, getLink, hasLink, links };
