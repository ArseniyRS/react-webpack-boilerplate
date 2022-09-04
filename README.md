# Webpack React.ts boilerplate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

OK. It works! https://react-webpack-boilerplate-psi.vercel.app/
## Introduction
Boilerplate is a starter kit for quick development start, which allows you to
save time on routine project setup and start developing right away.

## Core features
- React + RTK
- Typescript settings
- Clean code with `ESLint` + `Prettier` + `Stylelint`
- Dockerization of app
- SVG file as Component by `Svgr`
- CLI scripts

# Technology stack
* [React](https://ru.reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [React-router-dom](https://reactrouter.com/web/guides/quick-start)
* [React-use](https://github.com/streamich/react-use)
* [Redux-tool-kit(RTK)](https://redux-toolkit.js.org/)
* [Axios](https://github.com/axios/axios)
* [ESlint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [Stylelint](https://stylelint.io/)

## Content
1. [First start](#first-start)
2. [Project Structure](#project-structure)
2. [CLI creating](#cli-creating)
3. [Hooks](#hooks)
4. [Formatting](#formatting)
5. [Styles](#styles)
6. [Environments](#environment-variables)
6. [Import aliases](#import-aliases)

# First start
### Using docker and docker-compose
This option is good in that you don't need to install a lot of dependencies on your working device. Docker just encapsulates all that trash.

To start the project with this option you need to install [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

After, you just need to run the following command:
```bash
  yarn docker:dev # or npm run docker:dev
```

When `Docker` installs all the necessary dependencies and builds your application, you will see `Compiled successfully` in your console. Your project is available on `3000` port; you can open it and start developing. - [http://localhost:3000](http://localhost:3000)

### Using npm dependencies
If you can't or don't want to use `docker` you can use the default method for starting your project using [Node.JS and npm(yarn)](https://nodejs.org/en/)

1. Install dependencies
```bash
  yarn # or npm i
```
2. Start the project
```bash
  yarn start # or npm start
```
The application is available on [http://localhost:3000](http://localhost:3000)

# Project structure
- **README.md** - Project description
- **package.json** - Npm configuration file
- **docker-compose.dev.yml** - docker-compose config for development
- **.eslintrc** - ESLint config
- **.stylelintrc** - Stylelint config


- **public/shared** - Folder with static files
- **scripts** - Helpful scripts(CLI)
- **docker** - Dockerfiles' folder
- **docker/Dockerfile.dev** - config for dev mode


- **src** - Main development folder
- **src/assets** - Static assets (images, fonts, etc.)
- **src/components** - General ui components folder
- **src/components/[ComponentName]** - A single component folder
- **src/components/[ComponentName]/index.tsx** - Core file(import, default export)
- **src/components/[ComponentName]/[ComponentName].tsx** - A component itself
- **src/components/[ComponentName]/[ComponentName].module.scss** - Module scss styles
- **src/layouts** - Components folder for ui layouts such as header, sidebar, etc...
- **src/features** - Components folder for certain directions such as authorization, profile, etc...
- **src/services** - API request folder
- **src/pages** - Pages folder(routes)
- **src/hocs** - Higher Order Components (HOCs)
- **src/hooks** - React-hooks
- **src/index.tsx** - Core application file(entry point)
- **src/utils** - Utils folder(additional small reusable functions)
- **src/store** - Store folder
- **src/styles** - Global styles folder


# CLI creating
To create the component, you can use:

"components" folder is default
```bash
  npm run gen:component [ComponentName] [FolderName] 
  #yarn gen:component [ComponentName] [FolderName] 
```

To create the slice, you can use:
```bash
  npm run gen:slice [ComponentName]
  #yarn gen:slice [ComponentName]
```



# Hooks
#### React-use
This is a library of additional react hooks that meet most of the needs so that you do not have to reinvent the wheel every time.
[Hooks list](https://github.com/streamich/react-use)
Most useful hooks:
* [useDebounce](https://github.com/streamich/react-use/blob/master/docs/useDebounce.md)
* [useLocalStorage](https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md)
* [useMount](https://github.com/streamich/react-use/blob/master/docs/useMount.md)
* [useUpdateEffect](https://github.com/streamich/react-use/blob/master/docs/useUpdateEffect.md)
* [usePrevious](https://github.com/streamich/react-use/blob/master/docs/usePrevious.md)
* [useBoolean](https://github.com/streamich/react-use/blob/master/docs/useToggle.md)
* [useList](https://github.com/streamich/react-use/blob/master/docs/useList.md)


# Environment variables
To work with environment variables, we need to use some config files:
* `.env.development` - for variables of dev
* `.env.production` - for variables of prod
* `.env` - for variables if uses for dev and prod


# Formatting
Linters are to keep code clean. They prevent shitcode from getting into a repository.
## ESLint
[Eslint](https://eslint.org/) is used for linting Javascript and Typescript code.
To run a linter for fix tsx code:

```bash
  npm run lint
  #yarn lint
```
## Styles 
To lint css code, [stylelint](https://stylelint.io/) is used.
The linter checks your code for typos and spelling mistakes.

```bash
  npm run stylelint
  #yarn stylelint 
```

To lint scss code use:
```bash
  npm run stylelint:scss
  #yarn stylelint:scss
```
# Import aliases
We could define the alias components so that instead of having to do stuff like this:
```js
import MyComponent from '../../../../components/MyComponent'
```
We could do just do:
```js
import MyComponent from 'components/MyComponent'
```
All aliases:
```json
      "~": ["src/*"],
      "store": ["src/store/*"],
      "assets": ["src/assets/*"],
      "features": ["src/features/*"],
      "pages": ["src/pages/*"],
      "services": ["src/services/*"],
      "components": ["src/components/*"],
      "styles": ["src/styles/*"]
```
**You could change or add new aliases to tsconfig.json**

***Cheatsheets***
- [React + TypeScript](https://github.com/typescript-cheatsheets/react)
- [TypeScript 4.0 Cheat Sheet](https://www.sitepen.com/blog/typescript-cheat-sheet)
- [A collection of cheatsheets](https://devhints.io/typescript)


#### Useful VSCode extensions
* `Path Intellisense` - intelliSense for imports
* `ESLint` - lint highlight
* `Stylelint` - lint highlight