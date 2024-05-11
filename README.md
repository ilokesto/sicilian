# Sicilian

Sicilian is a TypeScript Library for managing 'global Form State' in React.js and next.js.

If you looking for a state based form management solution, Sicilian could be an option for you. Sicilian is simple to use, but has enough features we needs.

# How to use

## install

`npm i sicilian`

## import

`import { playDragon } from "Sicilian";`

## create a FormController with playDragon

playDragon is a custom hook that creates a store that contains global form states.

```ts
type SignIn = {
  email: string;
  password: string;
};

export const SignInFormController = playDragon<SignIn>({ email: "", password: "" });
```

## use a FormController

FormController object contains { FormState, ErrorState, register }. Each of these has a different feature.
FormState function returns an object containing the value entered in the form, and ErrorState function returns an object containing the error message according to error handling.

```tsx
const formState = SignInFormController.FormState();
const errorState = SignInFormController.ErrorState();

<p>email: {form.email}</p>
<p>{error.email}</p>
<p>password: {form.password}</p>
<p>{error.password}</p>
```

### How to use the Register function

Register function returns an object containing { value, onChange, onBlur, onFocus, name } and each of these can be applied directly to the input tag or passed as a props.

```tsx
// Form.ts
import { SignInFormController } from '@/playDragon/SignInFormController

const Form = () => {
  return (
    <>
      <input {...SignInFormController.register("email")} />
      <InputComponent {...SignInFormController.register("password")} />
    <>
)}
```

```tsx
// @/components/InputComponent.tsx

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: ChangeEvent<...>) => void;
  name: string;
}

const InputComponent = ({value, onChange, onBlur, onFocus, name}: Props) => {
  return (
    <>
      <input {value, onChange, onBlur, onFocus, name} />
    <>
)}
```

or you can use the Register function like this:

```tsx
// Form.ts
import { SignInFormController } from '@/playDragon/SignInFormControllerx
import { InputComponent } from '@/components/InputComponent
const Form = () => {
  return (
    <>
      <input {...SignInFormController.register("email")} />
      <InputComponent/>
    <>
)}
```

```tsx
// @/components/InputComponent.tsx
import { SignInFormController } from '@/playDragon/SignInFormController

const InputComponent = () => {
  return (
    <>
      <input {...SignInFormController.register("password")} />
    <>
)}
```
