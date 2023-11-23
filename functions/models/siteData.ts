export interface SiteData {
  meta: MetaData;
  children?: JSX.Element | JSX.Element[];
}

export interface MetaData {
  title: string;
  description?: string;
  canonical?: string;
  country?: unknown | string;
}
