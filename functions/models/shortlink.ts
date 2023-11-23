export class ShortLink {
  key?: string;
  url?: string;
  utm?: Record<string, string> = {};
  expire_at?: Date;
}
