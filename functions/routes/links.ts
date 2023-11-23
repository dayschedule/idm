import { Hono } from 'hono';
import { Bindings } from '../types/bindings';
import { ShortLink } from '../models/shortlink';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

const links = new Hono<{ Bindings: Bindings }>();

links.post('/', async (ctx) => {
  const data: ShortLink = await ctx.req.json();
  const expireAt = data.expire_at ? dayjs(data.expire_at).unix() : undefined;
  if (expireAt && expireAt <= dayjs().unix()) {
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
  return ctx.json({ ...data, key: key }, 201);
});

export { links };
