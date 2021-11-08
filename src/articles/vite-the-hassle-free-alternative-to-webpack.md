---
title: Vite, the hassle-free alternative to Webpack
id: 20211107
description: "Webpack is the most popular module bundler to build JavaScript applications, but it's slow and hard to configure. Thankfully, alternatives like Vite have appeared."
published: false
tags: ["ecosystem", "vite", "webpack", "modules"]
includeInSimilar: true
---
Webpack is the most popular module bundler to build complex JavaScript applications. It has more than 74 million downloads each month. However, **Webpack is slow and configuring it is a monumental pain.**

Thankfully, alternatives to Webpack have appeared, and one of them is [Vite](https://vitejs.dev/), from Evan You, the creator of the [Vue.js](https://vuejs.org/) front-end framework.

My favourite aspect of Vite is that **it's fast with a capital F and supports JSX, Vue single-file components and TypeScript out of the box, with zero configuration.** Just create your TypeScript/JSX file and Vite will parse it with zero hassle, in milliseconds.

Vite doesn't create itself the bundles. Under the hood, it uses two tools: [Esbuild](https://esbuild.github.io/) while you're developing, and [Rollup.js](https://rollupjs.org/) to create the production bundle.

The recommended way to create a project using Vite is by running the command `npm init vite` in the command line.

You'll be asked to write the project name and which framework you want to use (if you want to use one). Once the project is created, you run `npm install` to install dependencies and then you can start creating and editing JS and HTML files. 

Like Webpack, it has a built-in development server, that you can start with the command `npx vite`. When you need to create the production build, run `npx vite build` and everything will be built in the **/dist/** folder.

**The big drawback is that it doesn't have any tool for Server-Side Rendering (SSR) yet.** They are working on it, but it's still experimental and not recommended for production.

Also, even though Vite can parse TypeScript, it doesn't do the type checking, it just converts it into JavaScript code. You should rely on your IDE/editor to spot type errors.

**If your project already uses Webpack and you're satisfied with it, there's no reason to migrate to Vite. But if you're creating a new project, I highly recommend giving Vite a try.**