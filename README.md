# 🌳 Druid

A TypeScript full-stack web application scaffolding with [multi-page application support](https://vitejs.dev/guide/build.html#multi-page-app), powered by [FeathersJS](https://feathersjs.com/).

Server, home page, and console page unified in one project.

## 🛠️ Preparation

### Install Dependencies

```bash
npm install
```

### Generate Build Files

Build files are required for the server to run. You must generate them before starting the server.

```bash
npm run release
```

- `public` folder will be generated in the root directory.
- `src/ssr` folder will be generated, it contains a react server-side render for the server to use in production.
- `lib` folder will be generated, it contains the compiled TypeScript files for the server to use in production.

## 💾 Configure Database

This application utilizes [mysql](https://www.mysql.com/) as its database, [knex](https://knexjs.org/) as the query builder, and [orm-modeling](https://github.com/ShinChven/orm-modeling) to define database schemas, generate entity interfaces, and configure FeathersJS RESTful services.

## 🚀 Start Development Server

```bash
npm run dev
```

### 🏠 Home Page

Please visit [http://localhost:3030](http://localhost:3030) to view the application's home page, you can modify home page's content in `src/views/home`.

It is a single-page application (SPA) with server-side rendering (SSR) support.

### 💻 Console

Please visit [http://localhost:3030/console](http://localhost:3030/console) to view the application's console page, you can modify console page's content in `src/views/console`.

It is a single-page application (SPA) build with ant design UI components, you can modify it to your needs.

## 🔥 Auto Reload & Hot Module Replacement

### Server-side: Automatic Reloading

Whenever you modify the server's `.ts` or `.js` files, the Feathers server will automatically reload to reflect those changes.

### Client-side: Hot Module Replacement (HMR)

If you modify the client's `.tsx` files, HMR will be triggered to update the changes seamlessly.

**Note**: Ensure that you place `.tsx` files exclusively within the `views` folder. Modifying `.ts` files outside this directory will lead to a complete server restart, bypassing the HMR process.

## 🆘 Trouble Shooting

### React Component Rendered Twice?

This happens in development mode if the app is wrapped in a `<React.StrictMode>` component. Remove it to fix the issue.

Please go the entry file to remove it.
