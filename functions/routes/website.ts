import { Hono } from 'hono';
import { Bindings } from '../types/bindings';
import { ShortLink } from '../models/shortlink';
import { Home } from '../theme/home';
import { SiteData } from '../models/siteData';

const website = new Hono<{ Bindings: Bindings }>();

website.get('/', async (ctx) => {
  const { cf = {} } = ctx.req as any;
  const data = [
    {
      key: 'github',
      url: 'https://github.com/vickyrathee/idm',
      short_url: `https://idm.in/github`,
      params: {
        url_medium: 'search',
        utm_campaign: 'website',
      },
      created_at: new Date(),
    },
  ];

  const props: SiteData = {
    meta: {
      title: 'URL Shortener',
      description:
        'Create short links, QR Codes, and Link-in-bio pages with cloudflare worker for Free',
      canonical: '/',
      country: cf.country,
    },
    links: data,
  };
  return ctx.html(Home(props));
});

website.get('/:id', async (ctx) => {
  const key = ctx.req.param('id');
  const link: ShortLink = await ctx.env.SHORTLINKS.get(key, {
    type: 'json',
  });

  if (link && link.url) {
    return ctx.redirect(link.url, 302);
  } else {
    return ctx.json({ message: 'No link found' }, 404);
  }
});

export { website };
