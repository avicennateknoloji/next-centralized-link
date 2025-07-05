/**
 * Next.js için merkezileştirilmiş link yönetimi
 * Route tanımlarını tek yerden yönetmek için kullanılır
 */
type Slug = string | number;
type RouteParams = Record<string, string | number | undefined>;
type CentralizedLinkFunction = (params?: RouteParams | Slug) => string;
type LinkConfig = Record<string, CentralizedLinkFunction>;
declare class CentralizedLink {
    links: Record<string, CentralizedLinkFunction>;
    static centralizedLinkClass: CentralizedLink | null;
    constructor();
    initialize(config: LinkConfig): void;
    static getLinks(): Record<string, CentralizedLinkFunction>;
    static getInstance(): CentralizedLink;
}
declare const links: Record<string, CentralizedLinkFunction>;
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
declare const configureLinks: (config: LinkConfig) => void;
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
declare const centralizedLink: (key: string, value: CentralizedLinkFunction) => void;
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
declare const getLink: (key: string, params?: RouteParams | Slug) => string;
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
declare const hasLink: (key: string) => boolean;

export { CentralizedLink, type CentralizedLinkFunction, type LinkConfig, type RouteParams, type Slug, centralizedLink, configureLinks, getDefinedLinks, getLink, hasLink, links };
