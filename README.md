[![Build Size](https://img.shields.io/bundlephobia/minzip/sicilian?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=sicilian)
[![Version](https://img.shields.io/npm/v/sicilian?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)
[![Downloads](https://img.shields.io/npm/dt/sicilian.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/sicilian)

&nbsp;

[Sicilian Korean Docs / 한국어 공식 문서](https://lackluster.tistory.com/70)

&nbsp;

- [What's new in sicilian@3.0.0](#what's-new-in-sicilian-300)
- [install and import](#install-and-import)
- [createForm](#createForm)
  * [register](#register)
  * [handleValidate](#handlevalidate)
    + [validator](#validator)
    + [validate](#validate)
    + [Validation Priority and Order](#validation-priority-and-order)
  * [Values and Errors](#values-and-errors)
  * [handleSubmit](#handlesubmit)
- [useForm](#useForm)
- [SicilianProvider component and useSicilianContext Fn](#sicilianprovider-component-and-useSicilianContext-fn)
- [in App Router](#in-app-router)


&nbsp;


# Sicilian

Sicilian is a form state management tool that operates based on global state. It supports TypeScript and is compatible with React.js version 18 or higher.

In the frontend field, react-hook-form, a widely used form state management tool, operates based on refs. Because of this, you need to wrap components with forwardRef or use the useFormContext provided by the library. As a developer using Next.js, these limitations can be quite inconvenient.

Sicilian was developed to address these inconveniences by operating based on global state. This means Sicilian manages each input as state, helping you create forms using a controlled component approach. Additionally, since it is based on global state, you can call and use it from any component without the need for the context API or other global state management tools.

&nbsp;

# What's new in sicilian@3.0.0

* The playDragon function has been changed to the CreateForm class.
* Previously, initValue was required, but now all parameters of the CreateForm class can be provided optionally.
* Until now, sicilian only handled text-based input types. However, starting from version 3, it supports all types of inputs, including type="checkbox" and type="file". To accommodate this, validate now includes a checked property to verify whether an input is checked.
* InitValue is now optional, the parameters of the register function have been modified. More details on this will be covered below.
* The validateOn option now includes 'change'. This allows input values to be validated whenever the onChange event is triggered. However, this approach may put a load on the application, so it should be used with caution.
* The function names for managing form state and error state have been changed from setForm, FormState, setError, and ErrorState to getValues, setValues, getErrors, and setErrors, respectively.


&nbsp;

# install and import

```ts
npm i sicilian@latest
```
```ts
import { CreateForm } from "sicilian";
import { useForm } from "sicilian/useForm";
import { SicilianProvider, useSicilianContext } from "sicilian/provider";
```

&nbsp;

# CreateForm

The CreateForm class takes an initialization object and generates a formController object, which is necessary for managing form state. sicilian provides opt-in features through the initValue, validator, validateOn, and clearFormOn properties of the initialization object.

* initValue: Used when an input needs an initial value.
* validator: Specifies how to validate each input value. More details on each validation method will be covered below.
* validateOn: Defines when validation should be applied. Currently, input values can be validated when the form is submitted ("submit"), when the input loses focus ("blur"), or when the input changes ("change"). It is also possible to apply multiple validation triggers simultaneously by passing an array.
* clearFormOn: Unlike other form management libraries, sicilian retains user input even when navigating to a different page. Therefore, if a form needs to be reset in certain situations, clearFormOn can be used. The currently supported reset triggers are when the form is submitted ("submit") and when the route changes ("routeChange"). Like validateOn, multiple reset triggers can be applied simultaneously using an array.

```ts
const signUpFormController = new CreateForm({
  initValue: {
    email: "",
    password: "",
    nickname: "anonymous"
  },
  validator: {
    email: {
      required: {},
      checked: {},
      minLength: {},
      maxLength: {},
      RegExp: {},
      custom: {},
    }
  },
  validateOn: ["submit", "blur", "change"],
  clearFormOn: ["submit", "routeChange"]
});
```

The formController instance obtained through the CreateForm class includes various properties and methods that help manage the form state. The following sections will provide a detailed explanation of each property and method and their respective functionalities.

```ts
const {
  initValue,
  register,
  getValues,
  getErrors,
  setValues,
  setErrors,
  handleValidate, 
  handleSubmit
} = signUpFormController
```

## register

The register function returns an object that contains various values and methods for managing input and textarea tags. This function takes an object as an argument, and the name property, which specifies the input, is required. The type property for handling the input type and the validate object for validating the input value are optional.

```ts
function register(
  props: {
    name: string,
    validate?: RegisterErrorObj,
    type?: ValidInputTypes
  }): {
    id: string,
    name: string,
    value?: string,
    checked?: boolean,
    onBlur: (e: SicilianEvent) => void,
    onFocus: (e: SicilianEvent) => void,
    onChange: (e: SicilianEvent) => void,
  }
```

If the CreateForm class provides initValue or validator properties, TypeScript will infer the possible name values. If you are using TypeScript, you can get suggested name strings through your IDE.

<img width="771" alt="image" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLFHIF%2FbtsMohmyAAl%2FKEokgRpkpyDl6aBbcbOv5k%2Fimg.png">

Although the nickname field is not included in initValue or validator, it can still be registered without issues. Since all parameters in CreateForm are optional, fields that are not explicitly defined will still work properly. This allows for flexible form handling without needing to predefine every input field.

<img width="771" alt="image" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FwA8VV%2FbtsMmcm5wp8%2FImz4n4kYcKhIiE2BHknJK0%2Fimg.png">


&nbsp;

## handleValidate
Before we begin, it's important to clarify the definitions of two similar terms used in Sicilian. The ***validate object*** is used to validate a single input, while the ***validator object*** is a multidimensional object that groups these validate objects by their name field. The handleValidate method returns a validator object, and this validator object contains multiple validate objects that can be applied to each field. In type terms, it can be described as follows:

```ts
type Validator = Partial<Record<keyof initValue, Validate>>;
```

If necessary, you can create and use the validate and validator objects directly without handleValidate. However, using handleValidate has the advantage of incorporating type checking, allowing you to write more type-safe code. To achieve this, you need to provide an object literal as an argument to handleValidate, as shown in caseOne.

When providing a function's return value or a variable as an argument, as shown in caseTwo, excess property checks are not performed. More precisely, due to TypeScript's contravariance in function arguments, excess properties do not cause type errors. As a result, even if incorrect values are provided, handleValidate will not raise a type error, and the issue will only be discovered at runtime.

```ts
const { handleValidate } = SignInFormController

const caseOne = handleValidate({
  email: {},
  password: {}
})

const caseTwo = handleValidate(SignValidate())
```

So, it cannot be emphasized enough: if you decide to using handleValidate, rather than using validate and validator objects directly, always provide an object literal as the argument!

### validator
The validator object returned from handleValidate will have properties for each name field. This allows you to easily provide the validate object as the second argument to register, as shown below.

The second parameter of register is optional, so if a field does not require validation, you don't need to provide a validate object. This is why Partial is used when describing the Validator type. As a result, handleValidate operates only on the fields that require validation, not on all name fields.

```ts
export default function SignUp() {
  const { handleValidate } = SignInFormController
 
  const validator = handleValidate({
    email: {},
    password: {}
  })
 
  return (
    <>
      <input {...register({ name: "email", validate: validator.email })}/>
      <input {...register({ name: "password", validate: validator.password })}/>
      <input {...register({ name: "nickname")}/>
    </>
  )
}
```

### validate
The onBlur handler of register validates the input value based on the settings in the validate object. Sicilian uses the following four fields to validate each input, specifying the validation method and the error message to be sent to ErrorState if validation fails. If no error message is provided, Sicilian uses a default error message template in Korean (the reason is that i am a korean).

* **required** : Validates if the input value is required.
* **checked** : Validates if the input is checked.
* **minLength & maxLength** : Validates the minimum and maximum length of the input value.
* **RegExp** : Validates the input value using a regular expression.
* **custon** : Validates the input value using a custom method defined by the user.

&nbsp;

For required, checked, minLength, and maxLength, you can use primitive types such as true and number instead of an object containing a message. In such cases, if an error occurs, the default error message template is used.

```ts
required?: boolean | {required: boolean, message: string}
checked?: boolean | {checked: boolean, message: string}
minLength?: number | { number: number, message: string}
maxLength?: number | { number: number, message: string}
```
&nbsp;

For RegExp and custon, you can use either an object containing a message or an array of such objects. This allows you to validate the input value in multiple ways using more than one regular expression or validation function. Unlike the three fields discussed earlier, the message property for RegExp fields is optional.

```ts
RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
RegExpErrorObj = { RegExp: RegExp; message?: string };
```

```ts
email : {
    RegExp: {
      RegExp: new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      message: "Doesn't match email format",
    },
  },
  
password: {
  RegExp: [
    {
      RegExp: new RegExp("^[A-Za-z0-9!@#$%^&*()_+{}|:<>?~-]+$"),
      message: "Password cannot contain spaces.",
    },
    {
      RegExp: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]+$"),
      message: "password includes lower case, number, and special character.",
    },
  ],
},
```
The callback function *checkFn* used in custon takes the ***input value and the entire formState as arguments***, processes the validation logic, and returns a boolean. If the result is true, an error occurs; if false, no error occurs. Like RegExp, it can also accept an array of validation objects. This means you can validate a value in multiple ways if necessary.

```ts
custon?: custonErrorObj | Array<custonErrorObj>;
custonErrorObj = {
  checkFn: (
    value: string,
    formState: Record<keyof initValue, string>>
  ) =>boolean;
  message?: string
};
```

When creating a registration form, you need to ensure that the password and password confirmation values match. Using custon, you can easily validate this and return an error if they do not match.

```ts
custon: {
  checkFn: (
    value: string,
    formState: { password: string }
  ) => value === formState.password,
  message: "password mismatch",
},
```

The custon field is not only useful for comparing values of different inputs but also for implementing complex validation logic. For instance, if you want to ensure that a username does not contain inappropriate words managed in a backend database, you can fetch the data from the server and use it for validation, as shown below.

When a new inappropriate word is added to the database, the updated policy is applied immediately without needing to modify the frontend code. This is another advantage of the custon field.

```tsx
const isWordInclude = (wordList: string[]) => (value: string) => {
  for (const word of wordList) {
    if (value.includes(word)) return true;
  }

  return false;
};

export const useSignValidate = () => {
  const { data } = useQuery({ ... })

  const email = { ... }
  const password = { ... }
  const passwordCheck = { ... }

  const nickname = {
    custon: [
      {
        checkFn: !isWordInclude(data?.bad ?? []),
        message: "닉네임에 욕설을 포함할 수 없습니다",
      },
      {
        checkFn: !isWordInclude(data?.sexual ?? [])),
        message: "닉네임에 성적인 단어를 포함할 수 없습니다",
      },
    ]
  }
  
  return { email, nickname, password, passwordCheck }
}
```
```tsx
export default function SignUp() {
  const validator = useSignValidate();

  return (
    { ... }
    <input {...register("nickname", validator.nickname)} />
  )
}
```

### Validation Priority and Order

There are a few important considerations when validating inputs in Sicilian. One key point is that if a validate object is provided in register, the validator option specified in the CreateForm class will be ignored. This is referred to as the validation priority of the validate object in register over the validator option in CreateForm. For example, in the following case, validation for maxLength and minLength will be ignored, and only the required validation will be applied.

```tsx
export const { register } = createForm({
  initValue: { email: "" },
  validator: {
    email: {
      maxLength: 16,
      minLength: 8
    }
  },
})

export default function Comp() {  
  return <input {...register({ name: "email", validate: { required: true } })}>
}
```

Another important point is that Sicilian validates fields in the order they are listed in the validate object. Additionally, if an error is detected during the validation process, the validation will immediately stop.

In the first example, the minLength field is validated before the required field, making required effectively redundant since meeting minLength will naturally fulfill required. In contrast, in the second example, required first checks for the presence of a value, and then minLength checks the length of the value. If the validation result of an input is different from your expectations, you might have to check the order of the fields.

```ts
// required is meaningless
password: { minLength: 10, required: true }
 
// required is meaningfull
password: { required: true, minLength: 10 }
```

&nbsp;

## Values and Errors

Form state and error messages are automatically managed by Sicilian, but there are times when you need to manually control these values. For example, if a user needs to edit a previously written review, you must fetch the review data from the server and populate each input field with the received values.

In such cases, you can use setValues. To prevent infinite re-renders, it is typically used in combination with useEffect.

```tsx
const { setValues } = ArticleFormController

const { data } = useQuery({
  queryKey: ["review", reviewId],
  queryFn: getReview(reviewId)
  }
});

useEffect(() => {
  setValues({
    title: data?.title ?? "",
    author: data?.author ?? "",
    description: data?.description ?? ""
  });
}, [data]);
```

The objects returned by getValues and getErrors represent the global state itself, which means they share structural issues similar to the re-rendering behavior of the Context API. In other words, even if the input states are well-isolated, if a parent component contains the getValues object, the entire parent component will re-render.

To address this issue, the getValues and getErrors functions allow subscribing to only a portion of the global state by accepting a selecting name as an argument. In TypeScript, this can be represented as follows:

```ts
// It returns the global state T, if a name parameter is not provided
function getValues<T extends InitState>() => T

// It return the input value, if a name parameter is provided
function getValues<T extends InitState, K extends ExtractKeys<T>>(name: K) => T[K]
```

&nbsp;

## handleSubmit
The handleSubmit function takes a callback function as an argument. This callback receives the entire formState and the event object (e) at the time the onSubmit event occurs. Additionally, e.preventDefault() is handled internally, so there is no redirection caused by the form submission.

```tsx
<form
  onSubmit={handleSubmit(async (data, e) => {
    const res = await fetch("URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  })}
>
```

You can retrieve the entire formState from the getValues method and implement the submit logic yourself. However, using handleSubmit provides two significant advantages.

1. If there are any unresolved error messages, handleSubmit will stop the submission, preventing unwanted values from being sent to the backend.
2. Similarly, if all inputs managed by the formController are empty, handleSubmit will also stop the submission. This ensures that even if the user accidentally clicks the submit button, no unnecessary HTTP communication occurs.

Even if the clearFormOn: ["submit"] option is provided, the form will not be reset if the submission fails.

&nbsp;

# useForm

Sicilian distinguishes forms into static forms and dynamic forms. A static form refers to cases where the structure is completely fixed, such as in registration or login forms. In contrast, forms that are dynamically structured, such as comment forms, fall under the category of dynamic forms.
Before version 2.1, implementing dynamic forms with Sicilian was "almost" impossible. As shown in the example below, register corresponds one-to-one with createForm, and the formController object affects all inputs registered with it.

```tsx
// sicilianComment.ts
const { handleSubmit, register, setForm } = createForm({
  initValue: { comment: "" },
  validator: {
    comment: { required: true },
  },
  validateOn: ["submit"],
  clearFormOn: ["routeChange", "submit"],
});

// CommentInput.tsx
function CommentInput({
  initValue = "",
  inputName,
  buttonName,
}: {
  initValue?: string;
  inputName: string;
  buttonName: string;
}) {
  const isLogin = useIsLogin();
  const { onSubmit, isPending } = useCommentMutation({ initValue, depth });
  
  useEffect(() => {
    setForm({ comment: initValue });
  }, [initValue]);

  return (
    <Form.Textarea
      {...register({name: "comment"})}
      initValue={initValue}
      className={styles.textarea}
      disabled={!isLogin}
    />
  )
}
```

<img width="520" alt="스크린샷 2024-09-11 오후 7 32 53" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3YB2d%2FbtsKYDGyynB%2FPWrgx9SOC6KJKik76T1qy0%2Fimg.webp">

To address this issue and support dynamic forms, the useForm hook has been introduced. Unlike createForm, which had to be called outside of components, the useForm hook must be called inside a component, adhering to the rules of hooks.

By using the useForm hook, you can leverage Sicilian's full functionality while maintaining the "local state" that dynamically appears and disappears according to the component's lifecycle.

```tsx
function CommentInput({
  initValue = "",
  inputName,
  buttonName,
}: {
  initValue?: string;
  inputName: string;
  buttonName: string;
}) {
  const isLogin = useIsLogin();
  const { onSubmit, isPending } = useCommentMutation({ initValue, depth });
  const { handleSubmit, register, setForm } = useForm({
    initValue: { comment: "" },
    validator: {
      comment: { required: true },
    },
    validateOn: ["submit"],
  });
  
  useEffect(() => {
    setForm({ comment: initValue });
  }, [initValue]);
 
  return (
    <Form.Textarea
      {...register({name: "comment"})}
      initValue={initValue}
      className={styles.textarea}
      disabled={!isLogin}
    />
  )
}
```

The useForm hook can also be used with static forms, such as login or signup forms. However, from the perspective of **separation of concerns**, it is more advisable to use createForm to separate form logic from the component itself.


&nbsp;

# SicilianProvider component and useSicilianContext Fn

Previously, the properties returned by the register function were passed directly as props to the input tag or Input component using the spread operator. This caused the entire form to re-render when the input was changed.
```tsx
<input {...register('email', validator.email)}>
```
To suppress this, instead of using the spread operator, you should pass register and name as props and combine them within the Input component. The problem of this solution is that register and name are inferred as very narrow types, making it quite cumbersome to pass them as props to the component.

&nbsp;

To address these issues, Sicilian version 2.0.0 introduced **the SicilianProvider component and the useSicilianContext function**. As mentioned earlier, these are implemented internally using the Context API, and since they only pass predefined values and functions.

The SicilianProvider component accepts a value object as a prop, which contains five values and methods: **register, name, validate, type, getValues, and getErrors**. Among these, **register and name are required**, and based on the type of register, the valid string types for name are automatically inferred.

<img width="942" alt="스크린샷 2024-09-11 오후 8 16 46" src="https://github.com/user-attachments/assets/935c0df7-de47-48e8-90ba-6b6deed84caa">

&nbsp;
The other props except register and name can be provided optionally. and values and functions provided in this way can be retrieved using the useSicilianContext function. If the SicilianProvider component is not present in the parent node, the useSicilianContext function will throw an error like the following:

<img width="991" alt="스크린샷 2024-09-11 오후 8 03 26" src="https://github.com/user-attachments/assets/aeb50d35-7d52-4e24-abea-bb2d4393bfa1">

&nbsp;

If you attempt to access the validate, getValues, or getErrors props through the useSicilianContext function without providing them to the SicilianProvider component, here's what happens:
* For validate and type, it's fine because its type includes undefined, so it can be accessed without issues.
* For getValues and getErrors, if you try to access these functions through useSicilianContext without providing them in the SicilianProvider component, what you actually get is not the getValues or getErrors functions themselves but functions that log error messages to the console. These error messages will help you identify which component is attempting to use getValues and getErrors without having been provided these functions as props.

<img width="520" alt="스크린샷 2024-09-11 오후 7 32 53" src="https://github.com/user-attachments/assets/b23cc320-af88-4c15-b3bd-409789b8170d">

Here is a simple example of the Input component using SicilianProvider and useSicilianContext:
```tsx
import { register, getValues, getErrors } from "@/hooks/FormController/signUp.ts"
import { SicilianProvider } from "sicilian/provider"

export default function Home() {
  { ... }

  return (
    <>
      { ... }
      
      <SicilianProvider value={{ register, name: "email", getErrors }}>
        <Input />
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "password", getErrors }}>
        <Input />
      </SicilianProvider>
      
      { ... }
    </>
  )
}
```
```tsx
import { useSicilianContext } from "sicilian/provider"

export default function Input({className, ...props}: InputHTMLAttributes<HTMLInputElement>) {
  const { register, name, validate, getErrors } = useSicilianContext()
  
  const errorMessage = getErrors(name)
  
  return (
    <>
      <input {...props} {...register({ name, validate })} className={clsx(styles.input, className)} />
      <Show when={!!errorMessage}>
        {errorMessage}
      </Show>
    </>
  );
}
```

Here is an example of a login form using Sicilian version 1, inspected with Chrome's React Developer Tools. As shown, even when typing into the email input, you can see that the entire form is repeatedly re-rendering.

<img width="520" alt="스크린샷 2024-09-11 오후 7 32 53" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuOzNn%2FbtsJx1WfBvB%2FLgM8R9aoNDUSLM7Z3gzFc1%2Fimg.webp">

In the other hand, here is the login form recreated using the latest version looks as follows. By utilizing SicilianProvider, useSicilianContext, and the getErrors function, which allows subscribing to only a portion of the overall state, you can ensure that only the Input component being typed into is re-rendered, rather than the entire form being re-rendered.

<img width="520" alt="스크린샷 2024-09-11 오후 7 32 53" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0bspQ%2FbtsJy2AcCYS%2Fjgz5hx0kujNfirBgvxNWc0%2Fimg.webp">


# in App Router

In the Next.js App Router environment, Sicilian must be used with the **'use client'** directive. This is because the elements that make up Sicilian, such as **useSyncExternalStore and useContext**, all require the 'use client' directive. Other than this, the syntax can be used in the same way as before.

```tsx
'use client'
import { SicilianProvider } from "sicilian/provider";
import { register } from "@/component/play";
import Input from "@/component/Input";

export default function Home() {
  return (
    <div>
      <SicilianProvider value={{register, name: "email"}}>
        <Input />
      </SicilianProvider>

      <SicilianProvider value={{register, name: "password"}}>
        <Input />
      </SicilianProvider>
    </div>
  )
}
```
