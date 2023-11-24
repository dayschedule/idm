import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { Bindings } from '../types/bindings';
import { ShortLink, linkSchema } from '../models/shortlink';
import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

const links = new Hono<{ Bindings: Bindings }>();

links.post(
  '/',
  validator('json', (value, c) => {
    const parsed = linkSchema.safeParse(value);
    if (!parsed.success) {
      return c.json(parsed, 400);
    }
    return parsed.data as ShortLink;
  }),
  async (ctx) => {
    const data = ctx.req.valid('json');
    // Set expire_at if given, or fallback to 1 month expiry
    const expireAt = data.expire_at
      ? dayjs(data.expire_at).unix()
      : dayjs().add(1, 'month').unix();
    if (expireAt <= dayjs().unix()) {
      return ctx.json(
        { message: 'The expire_at must be greater then current date time' },
        400
      );
    }

    let key = data.key || nanoid(7);
    let exists = await ctx.env.SHORTLINKS.get(key);
    while (exists) {
      key = nanoid(7);
      exists = await ctx.env.SHORTLINKS.get(key);
    }
    await ctx.env.SHORTLINKS.put(key, JSON.stringify(data), {
      expiration: expireAt,
    });
    return ctx.json(
      { ...data, key: key, short_url: `https://idm.in/${key}` },
      200
    );
  }
);

links.get('/:id', async (ctx) => {
  const key = ctx.req.param('id');
  const data = await ctx.env.SHORTLINKS.get(key);
  if (!data) {
    return ctx.json({ message: `No data found with given key: ${key}` }, 404);
  }
  return ctx.json(data, 200);
});

links.put(
  '/:id',
  validator('json', (value, c) => {
    const parsed = linkSchema.safeParse(value);
    if (!parsed.success) {
      return c.json(parsed, 400);
    }
    return parsed.data as ShortLink;
  }),
  async (ctx) => {
    const data = ctx.req.valid('json');
    const key = ctx.req.param('id');
    const exists = await ctx.env.SHORTLINKS.get(key);
    if (!exists) {
      return ctx.json({ message: `No data found with given key: ${key}` }, 404);
    }
    // Extend expire_at if given, or fallback to 1 month expiry
    const expireAt = data.expire_at
      ? dayjs(data.expire_at).unix()
      : dayjs().add(1, 'month').unix();
    await ctx.env.SHORTLINKS.put(key, JSON.stringify(data), {
      expiration: expireAt,
    });
    return ctx.json(
      { ...data, key: key, short_url: `https://idm.in/${key}` },
      200
    );
  }
);

links.delete('/:id', async (ctx) => {
  const key = ctx.req.param('id');
  const data = await ctx.env.SHORTLINKS.get(key);
  if (!data) {
    return ctx.json({ message: `No data found with given key: ${key}` }, 404);
  }
  await ctx.env.SHORTLINKS.delete(key);
  return ctx.json({ message: 'Deleted' }, 200);
});

export { links };
