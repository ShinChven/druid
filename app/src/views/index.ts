import { Application } from '@feathersjs/express';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { HelmetData } from 'react-helmet';

type RenderHtml = (url: string, data: any) => Promise<{ appHtml: string, helmet: HelmetData }>

export async function viteSSRMiddleware(app: Application) {

  const isProd = process.env.NODE_ENV === 'production';
  const root = process.cwd();

  async function createViteServer() {
    let vite: any | undefined;
    if (!isProd) {
      const { createServer } = await import('vite');
      vite = await createServer({
        root,
        logLevel: 'info',
        server: {
          middlewareMode: true,
          watch: {
            usePolling: true,
            interval: 100,
          },
          hmr: {
          },
          // ...other Vite server config as needed
        },
        appType: 'custom',
      });
      app.use(vite.middlewares);
    }
    return vite;
  }

  const vite = await createViteServer();

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {

    try {
      const url = req.originalUrl;
      let template, render;
      if (req.baseUrl === '/console' || req.baseUrl.startsWith('/console/')) {
        if (!isProd) {
          template = fs.readFileSync(path.resolve('console/index.html'), 'utf-8');
          template = await vite!.transformIndexHtml(url, template);
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          template = fs.readFileSync(path.resolve('public/console/index.html'), 'utf-8');
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        }
      }
      if (!isProd) {
        template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
        template = await vite!.transformIndexHtml(url, template);
        render = (await vite!.ssrLoadModule('/src/views/home/server.tsx')).renderHtml as RenderHtml;
      } else {
        template = fs.readFileSync(path.resolve('public/index.html'), 'utf-8');
        render = (await import('../ssr/server.mjs')).renderHtml as unknown as RenderHtml;
      }
      const data = {
        title: 'Druid Scaffolding',
        url,
        description: 'It works! You are seeing a message rendered from the server.',
        message: 'Button on the left is a client-side route link. Button on the right is a server-side route link.'
      }
      const rendered = await render(url, data);
      const { appHtml, helmet } = rendered ?? {};
      const helmetString = `${helmet?.title?.toString()}
        ${helmet?.meta?.toString()}
        ${helmet?.link?.toString()}`;
      const script = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
      if (appHtml !== undefined) {
        let html = template
          .replace(`<!--app-html-->`, appHtml)
          .replace(`<!--initial-data-->`, script)
          .replace(`<!-- -->`, '');
        ;
        if (helmetString) {
          html = html.replace(`<!--helmet-->`, helmetString);
        }
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e: any) {
      !isProd && vite?.ssrFixStacktrace(e);
      console.error(e.stack);
    }
    next();
  });
}

