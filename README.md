# Sicilian

Sicilian is a form state management tool that operates based on global state. It supports TypeScript and can be used with Next.js and React.js.

In the frontend field, react-hook-form, a widely used form state management tool, operates based on refs. Because of this, you need to wrap components with forwardRef or use the useFormContext provided by the library. As a developer using Next.js, these limitations can be quite inconvenient.

Sicilian was developed to address these inconveniences by operating based on global state. This means Sicilian manages each input as state, helping you create forms using a controlled component approach. Additionally, since it is based on global state, you can call and use it from any component without the need for the context API or other global state management tools.

# install and import

```ts
npm i sicilian
```
```ts
import { playDragon } from "Sicilian";
```

&nbsp;

&nbsp;

# create a formController with playDragon

The functionality provided by Sicilian starts with the *playDragon* function. This function returns a *formController* object necessary for managing form state. As mentioned earlier, since Sicilian operates based on global state, the playDragon function must be called outside of any component.

The playDragon function requires an initialization object composed of the names of the inputs to be managed. If you want to set default values for each input, you can provide the desired values instead of empty strings in the properties, as shown in the example below.

```ts
const signUpFormController = playDragon({
  email: "",
  password: "",
  nickname: ""
});
 
export default signUpFormController
```

&nbsp;

&nbsp;

# use a formController

The formController object returned by the playDragon function contains various methods necessary for managing form state. Each method is as follows, and we will delve into more detail in the following sections:

* **register** : A method to register each input.
* **setValue** : A method used to insert the result of asynchronous communication into an input.
* **FormState** : A method that returns the current form state as an object.
* **ErrorState** : A method that returns an error message object based on the error handling results.
* **handleValidate** : A method used to automate the error handling of inputs.
* **handleSubmit** : A method that aids in form submission.


```tsx
export default function SignUp() {
  const { register, setValue, FormState, ErrorState, handleValidate, handleSubmit } = signUpFormController
 
  return <></>
}
```

&nbsp;

## register

By default, each register call matches a single input to be managed and takes a name string that helps identify the input and a validate object that assists in automatic input validation.

The register method returns an object containing the necessary name variable, value state, and onChange, onBlur, and onFocus methods required to manage an input tag. Therefore, you can easily register an input using the spread syntax as shown in the example below.

```tsx
export default function SignUp() {
  {...}
 
  return <input {...register("email", validator.email)}/>
}
```

Thanks to the initialization object provided to playDragon, TypeScript already knows which input names the register function will manage. Therefore, when using TypeScript, you can receive suggestions for valid input names from your IDE while writing the register function.

<img width="771" alt="image" src="https://github.com/ayden94/sicilian/assets/144667387/aa63b0f0-7e58-42d4-874f-d38bef054790">

Additionally, if you enter an incorrect input name, a type error will occur. This ensures that inputs can be managed reliably.

<img width="800" alt="image" src="https://github.com/ayden94/sicilian/assets/144667387/13d04c13-1444-4b35-ae41-3793981b3aa6">

&nbsp;

Now, let's examine how Sicilian works by exploring the various properties and methods returned by register one by one.

&nbsp;

### name

The register function uses the *name* value provided as an argument directly as a property. Since this value can be found through the *e.target.name* field of the event object, it is used internally to identify and specify the input where the event occurred.

The name field is the only means for Sicilian to distinguish each input. Therefore, if the same name is provided to different inputs, Sicilian will not be able to distinguish between them. Considering the fact that Sicilian operates based on global state and this characteristic of the name, we arrive at an interesting conclusion.

Using Sicilian ensures that different inputs located in separate parts of the application will always contain the same value if they share the same name. This is similar to hard links in Unix systems. ***If the names are the same, they refer to the same value from Sicilian's internal storage.*** In the following example, the same value can be confirmed in two different components.

```ts
import SignInFormController from "@/hooks/FormController/signUp.ts"

function Email1() {
  const { register } = SignInFormController;

  return (
    <input {...register('email')} />
  );
}

function Email2() {
  const { register } = SignInFormController;

  return (
    <input {...register('email')} />
  );
}
```

### value and onChange
When a specific value is entered into a registered input, the *onChange* event handler returned from register is triggered with each keystroke. This handler analyzes the event object and sends *e.target.name* and *e.target.value* to the formController object. As a result, the value state of register is updated with each input value.

One of the advantages of controlled components is the ease of manipulating input values. Sicilian allows you to leverage this advantage easily. The following example demonstrates how to transform all input values to uppercase.

```ts
export default function Home() {
  const emailInput = SignInFormController.register("email");
 
  const handleChange = (e: Input<"email">) => {
    e.target.value = e.target.value.toUpperCase();
    emailInput.onChange(e);
  };
 
  return <input {...emailInput} onChange={handleChange} />
}
```

<img width="523" alt="image" src="https://github.com/ayden94/sicilian/assets/144667387/b632984f-f0b9-4346-90c9-35ac74dc1b37">

One notable point is that the event object uses a unique type, ***Input<"email">***, instead of the usual ChangeEvent<HTMLInputElement>. This is one of the custom types provided by Sicilian and is used to track which input the event originated from.

<img width="603" alt="image" src="https://github.com/ayden94/sicilian/assets/144667387/29e99343-f281-444b-9225-d52d2b3648b5">




