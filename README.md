This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Directory Structure

### arrimo-next (Frontend)

1. components : Contains all the reusable components of application.
2. pages : Contains main pages of application.
3. public : Contains static media assets and files.
4. requests : Contains functions to make api calls to server.
5. slices : Contains redux slices to store data in redux store.
6. styles : Global stylesheet for complete application.
7. thunks : Thunk middleware for managing redux operations.
8. utils : Contains common utility functions
9. .eslintrc.json : linter
10. .gitignore : ignored build and node modules
11. next.config.js : contains default app build configuration.
12. package.json contains all the dependencies that are used in the application
13. store.js contains configuration of redux store.

### arrimo-server (Backend)

## Getting Started

First, run the development server:

```bash
npm run start
# or
npm run watch
```

1. src > middleware : Contains all the middlewares which are used in between api layers before or after executing http requests.
2. src > models : Contains model structure for database collections.
3. src > routes : Contains information about api routes.
4. src > services : Contains main logic for executing api calls.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
