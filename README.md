![sicilian](https://github.com/user-attachments/assets/8b31fafe-108f-4d2e-a1f4-0b1b53fc049a)

[![Build Size](https://img.shields.io/bundlephobia/minzip/sicilian?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=sicilian)
[![Version](https://img.shields.io/npm/v/sicilian?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)
[![Downloads](https://img.shields.io/npm/dt/sicilian.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)


&nbsp;

[official documents(en/ko)]([https://lackluster.tistory.com/70](https://sicilian-nextra.vercel.app/en))

&nbsp;

Sicilian is a form state management tool that operates based on global state. It supports TypeScript and is compatible with React.js version 18 or higher.

In the frontend field, react-hook-form, a widely used form state management tool, operates based on refs. Because of this, you need to wrap components with forwardRef or use the useFormContext provided by the library. As a developer using Next.js, these limitations can be quite inconvenient.

Sicilian was developed to address these inconveniences by operating based on global state. This means Sicilian manages each input as state, helping you create forms using a controlled component approach. Additionally, since it is based on global state, you can call and use it from any component without the need for the context API or other global state management tools.

&nbsp;

## What's new in sicilian@3.0.0

* The playDragon function has been changed to the CreateForm class.
* Previously, initValue was required, but now all parameters of the CreateForm class can be provided optionally.
* Until now, sicilian only handled text-based input types. However, starting from version 3, it supports all types of inputs, including type="checkbox" and type="file". To accommodate this, validate now includes a checked property to verify whether an input is checked.
* InitValue is now optional, the parameters of the register function have been modified. More details on this will be covered below.
* The validateOn option now includes 'change'. This allows input values to be validated whenever the onChange event is triggered. However, this approach may put a load on the application, so it should be used with caution.
* The function names for managing form state and error state have been changed from setForm, FormState, setError, and ErrorState to getValues, setValues, getErrors, and setErrors, respectively.


&nbsp;

## install and import

```ts
npm i sicilian@latest
```
```ts
import { CreateForm } from "sicilian";
import { useForm } from "sicilian/useForm";
import { SicilianProvider, useSicilianContext } from "sicilian/provider";
```
