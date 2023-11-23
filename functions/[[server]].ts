import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { Bindings } from './types/bindings';
import { website } from './routes/website';
import { links } from './routes/links';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: Bindings }>();

// Assets must be before CORS
// Design https://screely.com/
app.get('/static/*', async (ctx) => {
  return await ctx.env.ASSETS.fetch(ctx.req.raw);
});

app.onError((err, ctx) => {
  console.log(`Server error`, err);
  return ctx.json({ message: 'Server error' }, 500);
});

app.route('/', website);

// API Routes
app.use(
  '*',
  cors({
    maxAge: 86400 * 7,
    origin: '*',
  })
);
app.route('/api/links', links);

app.notFound((c) => {
  return c.json({ error: 'No route found' }, 404);
});

// Print all routes
app.showRoutes();

export const onRequest = handle(app);
