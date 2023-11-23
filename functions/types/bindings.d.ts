export type Bindings = {
  CACHE_TTL: number;
  USERNAME: string;
  PASSWORD: string;
  ASSETS: Fetcher;
  DB: D1Database;
  SHORTLINKS: KVNamespace;
};
