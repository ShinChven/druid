# Druid

A TypeScript full-stack web application scaffolding with [multi-page application support](https://vitejs.dev/guide/build.html#multi-page-app), powered by [FeathersJS](https://feathersjs.com/).

## Development Guidelines

### Preparation

#### Install Dependencies

```bash
npm install
```

#### Generate Build Files

Build files are required for the server to run. You must generate them before starting the server.

```bash
npm run release
```

- `public` folder will be generated in the root directory.
- `src/ssr` folder will be generated, it contains a react server-side render for the server to use in production.
- `lib` folder will be generated, it contains the compiled TypeScript files for the server to use in production.

### Server-side: Automatic Reloading

Whenever you modify the server's `.ts` or `.js` files, the Feathers server will automatically reload to reflect those changes.

### Client-side: Hot Module Replacement (HMR)

If you modify the client's `.tsx` files, HMR will be triggered to update the changes seamlessly.

**Note**: Ensure that you place `.tsx` files exclusively within the `views` folder. Modifying `.ts` files outside this directory will lead to a complete server restart, bypassing the HMR process.