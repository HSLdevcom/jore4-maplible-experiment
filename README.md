# jore4-maplibre-experiment

This repository is based on [HSLdevcom/jore4-ui](https://github.com/HSLdevcom/jore4-ui). The purpose of this repository is to have playground where OpenLayers map libraries can be experimented.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests & QA

### TypeScript

TypeScript's type checking can be run with `yarn ts:check`.

### Code formatting

Code should be formatted with `prettier`. It is highly recommended for developers to set their editor to format code automatically with `prettier` every time when file is saved.
This way code magically stays neatly formatted and you don't have to do anything about it by yourself.
If you want to run prettier manually for some reason you can run `yarn prettier` (for writing changes) or `yarn prettier:check` (for making sure that code is formatted as prettier wants, but without modifying anything).

### Code style

We have enabled `eslint` with opionated rulesets for keeping code style clean & consistent and for avoiding certain mistakes. Eslint can be run with `yarn lint`. It is highly recommended for developers to use eslint extension with their editors so that they can see linting errors instantly when writing code.

Eslint can fix certain linting errors automatically when ran with `--fix` flag, e.g. `yarn lint --fix`.

### Local tests

For tests we use `jest`, `ts-jest` and `@testing-library/react`.
Ts-jest was chosen over `@babel/preset-typescript` as it has [certain advantages](https://kulshekhar.github.io/ts-jest/docs/babel7-or-ts/) such as type checking.
`@testing-library/react` is used with jest as it provides ways to interact with DOM.
Tests can be run with `yarn test`.

### CI

CI runs all type checking, prettier, linter and tests for each pull request. But as a developer, your responsibility is to make sure that all of those tools stay happy (=do not give any errors or warnings) after each commit. As a convenience we have `yarn qa` script which runs all of those in one step. Thus it can be used locally for checking that everything is fine.

### Recommended tooling

If you use VSCode, following plugins are recommended:

- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting code automatically with `prettier`
- [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for showing linting errors within the code
- [bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) for adding Tailwind suggestions to IntelliSense

It is also recommended to enable the [organize imports](https://code.visualstudio.com/docs/languages/typescript#_organize-imports) feature so that the imports will be ordered as the linter wants automatically.
Non-VSCode users can sort imports e.g. by running `yarn lint --fix` on command line.
(Probably there are also ways to configure other IDE's to order imports automatically or a way to make them run the linter with `--fix` flag automatically when code file is saved.)
