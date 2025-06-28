
![ilokestoSicilian](https://github.com/user-attachments/assets/a2e9c05c-7249-4b83-b50f-3194e1943481)



[![Build Size](https://img.shields.io/bundlephobia/minzip/sicilian?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=sicilian)
[![Version](https://img.shields.io/npm/v/sicilian?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)
[![Downloads](https://img.shields.io/npm/dt/sicilian.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)


&nbsp;

[Official documents](https://sicilian-nextra.vercel.app/en)

&nbsp;

Sicilian is a form state management tool that operates based on global state. It supports TypeScript and is compatible with React.js version 18 or higher.

In the frontend field, react-hook-form, a widely used form state management tool, operates based on refs. Because of this, you need to wrap components with forwardRef or use the useFormContext provided by the library. As a developer using Next.js, these limitations can be quite inconvenient.

Sicilian was developed to address these inconveniences by operating based on global state. This means Sicilian manages each input as state, helping you create forms using a controlled component approach. Additionally, since it is based on global state, you can call and use it from any component without the need for the context API or other global state management tools.

&nbsp;

##  What's new in sicilian@3.1.0

* Now supports runtime validation using zod, yup, and superstruct.
* Fixed a bug where the register function was not working properly with type="radio".
* The validateOptions function, which can be used more generally instead of handleValidate, has been added.

&nbsp;

## install and import

Sicilian is available as a package on NPM for use:

```bash
npm i sicilian@latest
pnpm add sicilian@latest
yarn add sicilian@latest
bun add sicilian@latest
```
