import { ShortLink } from './shortlink';

export interface SiteData {
  meta: MetaData;
  children?: any;
  links?: Array<ShortLink>;

}

export interface MetaData {
  title: string;
  description?: string;
  canonical?: string;
  country?: unknown | string;
}
