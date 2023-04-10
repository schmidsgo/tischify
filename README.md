# Tischify

## Technologie-Stack:

- Vue 3.2 mit Pinia
- Tailwindcss 3
- Express
- Postgres (pg.js)

## client

This template should help get you started developing with Vue 3 in Vite.

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Project Setup

```sh
/client) npm install
```

#### Compile and Hot-Reload for Development

```sh
/client) npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
/client) npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
/client) npm run test:unit
```

#### Lint with [ESLint](https://eslint.org/)

```sh
/client) npm run lint
```
