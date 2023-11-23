import { Hono } from 'hono';
import { Bindings } from '../types/bindings';
import { ShortLink } from '../models/shortlink';
import { DayScheduleWidget } from '../theme/dayschedule';

const website = new Hono<{ Bindings: Bindings }>();

website.get('/', async (ctx) => {
  return ctx.redirect('https://dayschedule.com', 302);
});

website.get('/:id', async (ctx) => {
  const key = ctx.req.param('id');
  const shortLink: ShortLink = await ctx.env.SHORTLINKS.get(key, {
    type: 'json',
  });

  if (shortLink && shortLink.url) {
    if (shortLink.url.includes('dayschedule.')) {
      return ctx.html(DayScheduleWidget(shortLink));
    } else {
      return ctx.redirect(shortLink.url, 302);
    }
  } else {
    return ctx.json(
      { message: 'No link found, or this link has been expired' },
      404
    );
  }
});

export { website };
