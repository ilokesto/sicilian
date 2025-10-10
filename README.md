
![ilokestoSicilian](https://github.com/user-attachments/assets/a2e9c05c-7249-4b83-b50f-3194e1943481)



[![Build Size](https://img.shields.io/bundlephobia/minzip/sicilian?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=sicilian)
[![Version](https://img.shields.io/npm/v/sicilian?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)
[![Downloads](https://img.shields.io/npm/dt/sicilian.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)


&nbsp;

[Official documents](https://ilokesto.vercel.app/sicilian)

&nbsp;

react-hook-form, a widely used form state library in frontend development, operates around refs. That often requires wrapping components with forwardRef or using useFormContext. For many React developers, that constraint can be inconvenient.

sicilian addresses these issues by building on a global state approach. It manages each input as state and helps you write forms in a controlled-component style. Sicilian uses React's Context API internally to manage form state globally, so any component can access and manipulate form state without adding a separate global state library (e.g., Redux, Zustand).

&nbsp;

##  What's new in sicilian@3.1.0

* Runtime validation support using zod, yup, and superstruct.
* Fixed a bug in register for type="radio".
* Added validateOptions as a general replacement for handleValidate.
* Added handleServerAction to support server actions.
* A CLI to generate code snippets quickly has been added. See the CLI usage page for details.

&nbsp;

## install and import

sicilian can be installed using several methods listed below.

```bash
npm i @ilokesto/sicilian
pnpm add @ilokesto/sicilian
yarn add @ilokesto/sicilian
bun add @ilokesto/sicilian
```

&nbsp;

## Quick start

The example below shows basic sicilian usage. It implements a simple login form including validation for email and password fields. See how the sicilian form controller manages state and displays error messages for inputs.

```tsx
import { useForm } from '@ilokesto/sicilian';

export default function MySimpleForm() {
  const { register, handleSubmit, getErrors } = useForm({
    initValue: {
      name: '',
      email: ''
    },
    validator: {
      name: {
        required: { required: true, message: 'name is required' }
      },
      email: {
        required: { required: true, message: 'email is required' },
        RegExp: {
          RegExp: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
          message: 'email format is invalid'
        }
      }
    }
  });

  const onSubmit = (data) => {
    console.log('data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">name:</label>
        <input id="name" {...register({ name: 'name', type: 'text' })} />
        {getErrors('name')}
      </div>

      <div>
        <label htmlFor="email">email:</label>
        <input id="email" {...register({ name: 'email', type: 'email' })} />
        {getErrors('email')}
      </div>

      <button type="submit">login</button>
    </form>
  );
}
```