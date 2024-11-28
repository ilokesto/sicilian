[Sicilian Korean Docs / 한국어 공식 문서](https://lackluster.tistory.com/170)

&nbsp;


# Sicilian

Sicilian is a form state management tool that operates based on global state. It supports TypeScript and can be used with Next.js and React.js.

In the frontend field, react-hook-form, a widely used form state management tool, operates based on refs. Because of this, you need to wrap components with forwardRef or use the useFormContext provided by the library. As a developer using Next.js, these limitations can be quite inconvenient.

Sicilian was developed to address these inconveniences by operating based on global state. This means Sicilian manages each input as state, helping you create forms using a controlled component approach. Additionally, since it is based on global state, you can call and use it from any component without the need for the context API or other global state management tools.

&nbsp;

# What's new in sicilian@2.1.0

* The new version of Sicilian is designed with a focus on **developer convenience**. Notably, the playDragon function has been enhanced with several new features.
* The playDragon function now accepts not only initValue but also a variety of options related to Sicilian's behavior. This allows developers to manage the validator for the entire form in one place and even specify the timing of input validation—something that was previously impossible.
* Since Sicilian is based on a global state, user-entered data remains intact even after a form submission. While this behavior can be beneficial in some cases, it may not always be desirable. Previously, developers had to use methods like **setForm(initValue)** to clear the form after submission. With the new version, Sicilian introduces the **formClearOn option**, enabling automatic form clearing upon events such as page navigation or form submission.
*  Additionally, **FormProvider** has been renamed to **SicilianProvider** and now accepts a value prop. This change simplifies code writing, making it even more efficient for developers. and **getContext** function also has been renamed to **getSicilianContext**.


&nbsp;

# install and import

```ts
npm i sicilian
```
```ts
import { playDragon, useDragon, SicilianProvider, getSicilianContext } from "Sicilian";
```

&nbsp;

# create a formController with playDragon

The functionality provided by Sicilian starts with the *playDragon* function. This function returns a *formController* object necessary for managing form state. As mentioned earlier, since Sicilian operates based on global state, the playDragon function must be called outside of any component.

The playDragon function now supports two ways to receive arguments. One way involves passing the initialization object and the options object separately, as in (initValue, option). The other way allows you to pass a single object where the initialization object is included within the options object, as in (initValueWithOption).

In both way, if you want to provide default values for inputs, you can include the desired values in the properties instead of empty strings, as shown in the example below.

```ts
// (initValue, option) way
const signUpFormController = playDragon(
  { email: "", password: "", nickname: "익명" },
  {
    validator: {},
    validateOn: [],
    clearFormOn: [],
  }
);

// (initValueWithOption) way
const signUpFormController = playDragon({
  initValue: { email: "", password: "", nickname: "익명" },
  validator: {},
  validateOn: [],
  clearFormOn: [],
});
```

## options

Sicilian currently handles three options: validator, validateOn, and clearFormOn.

* **validator** : In previous versions of Sicilian, each register function directly received a validate object for input validation. Now, you can create a validator object using the validator option. Details regarding the validator object and validate object will be further explained in the "handleValidate" section below.
* **validateOn** : Previously, Sicilian validated inputs only on onBlur events. This caused issues where inputs weren’t validated when a form submission was attempted using methods like pressing Enter in an input field without losing focus. Consequently, invalid data could be sent to the server. With the new validateOn option, Sicilian can validate input values not only on onBlur but also in onSubmit situations.
* **clearFormOn** : In earlier versions, clearing a form required manually calling setForm(initValue) for each situation. Now, with the clearFormOn option, Sicilian automatically resets the form to its initial state in two of the most common scenarios where clearing is needed: routeChange and submit.
* 
```ts
{
  initValue: { email: "" },
  validateOption: {
    email: { required: true }
  },
  validateOn: ["submit", "blur"],
  clearFormOn: ["submit", "routeChange"]
}
```

If the **clearFormOn** option is set to **routeChange**, Sicilian automatically detects whether the current environment is **react-router, the Next.js app router, or the Next.js page router** and handles it accordingly. Therefore, in other environments, clearFormOn: ["routeChange"] may not function as intended.


&nbsp;

## use a formController

The formController object returned by the playDragon function contains various methods necessary for managing form state. Each method is as follows, and we will delve into more detail in the following sections:

* **initValue** : A property that retains the initialization object provided as an argument to playDragon.
* **register** : A method to register each input.
* **setForm** : A method used to insert specific values into an input. It is mainly used to insert the results of asynchronous communication.
* **setError** : A method used to insert specific error messages into an input.
* **FormState** : A method that returns the current form state as an object.
* **ErrorState** : A method that returns an error message object based on the error handling results.
* **handleValidate** : A method used to automate the error handling of inputs.
* **handleSubmit** : A method that aids in form submission.


```tsx
export default function SignUp() {
  const { initValue, register, setValue, FormState, ErrorState, handleValidate, handleSubmit } = signUpFormController
 
  return <></>
}
```

## register

By default, each register call matches a single input to be managed and takes a name string that helps identify the input and a validate object that assists in automatic input validation.

The register method returns an object containing the necessary name and id variables, value state, and onChange, onBlur, and onFocus methods required to manage an input tag. (If the blur option is not selected in the validateOn setting, the register function will not return the onBlur method.) Therefore, you can easily register an input using the spread syntax as shown in the example below.

```tsx
const { name, id, value, onChange, onBlur, onFocus } = register("email")
 
export default function SignUp() {
  return <input {...register("email", validator.email)}/>
}
```

Thanks to the initialization object provided to playDragon, TypeScript already knows which input names the register function will manage. Therefore, when using TypeScript, you can receive suggestions for valid input names from your IDE while writing the register function.

<img width="771" alt="image" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdOfzxt%2FbtsJyt53cBr%2FOJdLcO955AesVrOYInrLA1%2Fimg.png">

Additionally, if you enter an incorrect input name, a type error will occur. This ensures that inputs can be managed reliably.

<img width="771" alt="image" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcdvh21%2FbtsJx6J157y%2Flix7SubLJa6kPqbqF9h4d1%2Fimg.png">



### name and id

register function returns the name value passed as an argument directly into the name and id properties. The id property is added in ver 2.0.0 to be used with the htmlFor attribute of the label tag.

```tsx
function register(name: string, validateOption: Validate) {
  { ... }

  return { name, id: name, ...}
}
```

Sicilian uses **e.target.name** from the event object to identify and distinguish the input where the event occurred. Therefore, the name parameter in the register function is the only way Sicilian can differentiate between each input. As a result, if the name prop is provided multiple times, as shown below, it is highly likely to result in unintended behavior.

```tsx
// Duplicate name prop provided, but no type error occurs
<input {...register("email")} name="e-mail" />
```

Similarly, if the same name is provided to different inputs, Sicilian will not be able to distinguish between them. When you consider the fact that Sicilian operates based on global state and this characteristic of Sicilian's name, you arrive at an interesting conclusion.

Using Sicilian ensures that different inputs located in separate parts of the application will always contain the same value if they share the same name. This is similar to hard links in Unix systems. ***If the names are the same, they refer to the same value from Sicilian's internal storage.*** In the following example, the same value can be confirmed in two different components.

```tsx
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase();
    emailInput.onChange(e);
  };

  return <input {...emailInput} onChange={handleChange} />
}
```

### onBlur and onFocus
The onBlur handler is triggered when the input tag loses focus. It automatically validates the value of the input based on the handleValidate method and the validator object returned from it. If an issue is found during the validation process, the onBlur handler immediately stops execution and sends the error information to ErrorState. The onFocus handler, on the other hand, is triggered when the input tag gains focus. If there is an error for the input in the ErrorState, it removes that error.

&nbsp;


So far, we have looked at how Sicilian operates through the various properties and methods returned by register. However, Sicilian's formController object also provides a variety of useful methods beyond register. From now on, let's take a look at each of these methods.


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
      <input {...register("email", validator.email)}/>
      <input {...register("password", validator.password)}/>
      <input {...register("nickname")}/>
    </>
  )
}
```


### validate
The onBlur handler of register validates the input value based on the settings in the validate object. Sicilian uses the following four fields to validate each input, specifying the validation method and the error message to be sent to ErrorState if validation fails. If no error message is provided, Sicilian uses a default error message template in Korean (the reason is that i am a korean).

* **required** : Validates if the input value is required.
* **minLength & maxLength** : Validates the minimum and maximum length of the input value.
* **RegExp** : Validates the input value using a regular expression.
* **customChecker** : Validates the input value using a custom method defined by the user.

&nbsp;

For required, minLength, and maxLength, you can use primitive types such as true and number instead of an object containing a message. In such cases, if an error occurs, the default error message template is used.
```ts
required?: boolean | {required: boolean, message: string}
 
minLength?: number | { number : number, message: string}
maxLength?: number | { number : number, message: string}
```
&nbsp;

For RegExp and customChecker, you can use either an object containing a message or an array of such objects. This allows you to validate the input value in multiple ways using more than one regular expression or validation function. Unlike the three fields discussed earlier, the message property for RegExp fields is optional.
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
The callback function *checkFn* used in customChecker takes the ***input value and the entire formState as arguments***, processes the validation logic, and returns a boolean. If the result is true, an error occurs; if false, no error occurs. Like RegExp, it can also accept an array of validation objects. This means you can validate a value in multiple ways if necessary.
```ts
customChecker?: CustomCheckerErrorObj | Array<CustomCheckerErrorObj>;
CustomCheckerErrorObj = {
  checkFn: (
    value: string,
    formState: Record<keyof initValue, string>>
  ) =>boolean;
  message?: string
};
```

When creating a registration form, you need to ensure that the password and password confirmation values match. Using customChecker, you can easily validate this and return an error if they do not match.


```ts
customChecker: {
  checkFn: (
    value: string,
    formState: { password: string }
  ) => value === formState.password,
  message: "password mismatch",
},
```

The customChecker field is not only useful for comparing values of different inputs but also for implementing complex validation logic. For instance, if you want to ensure that a username does not contain inappropriate words managed in a backend database, you can fetch the data from the server and use it for validation, as shown below.

When a new inappropriate word is added to the database, the updated policy is applied immediately without needing to modify the frontend code. This is another advantage of the customChecker field.

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
    customChecker: [
      {
        checkFn: isWordInclude(data?.bad ?? []),
        message: "닉네임에 욕설을 포함할 수 없습니다",
      },
      {
        checkFn: isWordInclude(wordList(data?.sexual ?? [])),
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

There are several important considerations when validating inputs with Sicilian. One key point is that if a validate object is provided to the register function, the validator option in the playDragon function will be ignored. This is referred to as the validation priority of the validate object in the register function over the validator option in playDragon.

For example, in the following case, validation for maxLength and minLength will be ignored, and only the required validation will be applied.

```tsx
const signInFormController = playDragon({
  initValue: { email: "" },
  validator: {
    email: {
      maxLength: 16,
      minLength: 8
    }
  },
})

export default function Comp() {
  const { register, handleValidate } = signInFormController
  
  const validator = handleValidate({
    email: {
      required: true
    }
  })
  
  return <input {...register("email", validator.email)}>
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

## setForm and setError

To implement a feature where users can load and edit a previously written review, you first need to fetch the review data from the server and insert the values into each input. setForm provides the functionality needed for this, and to prevent infinite rendering, it is typically called within useEffect or inside a function. 

```tsx
const { setValue } = SignInFormController
 
const { data } = useQuery({
  queryKey: ["review", reviewId],
  queryFn: getReview(reviewId)
  }
});
 
useEffect(() => {
  setValue({
    title: data?.title ?? "",
    author: data?.author ?? "",
    description: data?.description ?? ""
  });
}, [data]);
```

setError is similar to setForm, but instead of inserting values into an input, it is used to manually insert error messages.

&nbsp;

## FormState & ErrorState
The FormState function returns a formState object that stores the state of the inputs managed by formController. The ErrorState function returns an errorState object that contains error messages resulting from validation.

```tsx
export default function SignUp() {
  const formState = FormState()
  const errorState = ErrorState()
  
  return (
    <>
      {...}
      
      <p>form & error state</p>
      <p>email : {formState.email}</p>
      <p style={{ color: "red" }}>{errorState.email}</p>
      <p>password : {formState.password}</p>
      <p style={{ color: "red" }}>{errorState.password}</p>
      <p>nickname : {formState.nickname}</p>
      <p style={{ color: "red" }}>{errorState.nickname}</p>
    </>
  );
}
```


The formState and errorState objects are global states themselves, which means they face similar issues as the Context API's re-rendering. In other words, no matter how well you isolate the state of individual inputs, if the formState object is present in a parent component, the entire parent component will re-render.

To address this issue, the FormState and ErrorState functions now accept a name parameter **to allow subscribing to only a portion of the global state**. In type terms, this can be expressed as follows:

```ts
// It returns the global state T, if a name parameter is not provided
function FormState<T extends InitState>() => T

// It return the input value, if a name parameter is provided
function FormState<T extends InitState>(name: keyof T) => string
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

You can retrieve the entire formState from the FormState method and implement the submit logic yourself. However, using handleSubmit provides two significant advantages.

1. If there are any unresolved error messages, handleSubmit will stop the submission, preventing unwanted values from being sent to the backend.
2. Similarly, if all inputs managed by the formController are empty, handleSubmit will also stop the submission. This ensures that even if the user accidentally clicks the submit button, no unnecessary HTTP communication occurs.

Even if the clearFormOn: ["submit"] option is provided, the form will not be reset if the submission fails.


&nbsp;

# SicilianProvider component and getSicilianContext Fn

Previously, the properties returned by the register function were passed directly as props to the input tag or Input component using the spread operator. This caused the entire form to re-render when the input was changed.
```tsx
<input {...register('email', validator.email)}>
```
To suppress this, instead of using the spread operator, you should pass register and name as props and combine them within the Input component. The problem of this solution is that register and name are inferred as very narrow types, making it quite cumbersome to pass them as props to the component.

&nbsp;

To address these issues, Sicilian version 2.0.0 introduced **the SicilianProvider component and the getSicilianContext function**. As mentioned earlier, these are implemented internally using the Context API, and since they only pass predefined values and functions.

The SicilianProvider component accepts a value object as a prop, which contains five values and methods: **register, name, validateOption, FormState, and ErrorState**. Among these, **register and name are required**, and based on the type of register, the valid string types for name are automatically inferred.

<img width="942" alt="스크린샷 2024-09-11 오후 8 16 46" src="https://github.com/user-attachments/assets/935c0df7-de47-48e8-90ba-6b6deed84caa">

&nbsp;
The other three props except register and name can be provided optionally. and values and functions provided in this way can be retrieved using the getSicilianContext function. If the SicilianProvider component is not present in the parent node, the getSicilianContext function will throw an error like the following:

<img width="991" alt="스크린샷 2024-09-11 오후 8 03 26" src="https://github.com/user-attachments/assets/aeb50d35-7d52-4e24-abea-bb2d4393bfa1">

&nbsp;

If you attempt to access the validateOption, FormState, or ErrorState props through the getSicilianContext function without providing them to the SicilianProvider component, here's what happens:
* For validateOption, it's fine because its type includes undefined, so it can be accessed without issues.
* For FormState and ErrorState, if you try to access these functions through getSicilianContext without providing them in the SicilianProvider component, what you actually get is not the FormState or ErrorState functions themselves but functions that log error messages to the console. These error messages will help you identify which component is attempting to use FormState and ErrorState without having been provided these functions as props.

<img width="520" alt="스크린샷 2024-09-11 오후 7 32 53" src="https://github.com/user-attachments/assets/b23cc320-af88-4c15-b3bd-409789b8170d">

Here is a simple example of the Input component using SicilianProvider and getSicilianContext:
```tsx
import { register, FormState, ErrorState } from "@/hooks/FormController/signUp.ts"
import { FormContext } from "sicilian";

export default function Home() {
  { ... }

  return (
    <>
      { ... }
      
      <SicilianProvider value={{ register, name: "email", ErrorState }}>
        <Input />
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "password", ErrorState }}>
        <Input />
      </SicilianProvider>
      
      { ... }
    </>
  )
}
```
```tsx
import { getSicilianContext } from "sicilian";

export default function Input({className, ...props}: InputHTMLAttributes<HTMLInputElement>) {
  const { register, name, validateOption, ErrorState } = getSicilianContext()
  
  const errorMessage = ErrorState(name)
  
  return (
    <>
      <input {...props} {...register(name, validateOption)} className={clsx(styles.input, className)} />
      <Show when={!!errorMessage}>
        {errorMessage}
      </Show>
    </>
  );
}
```

Here is an example of a login form using Sicilian version 1.1.10, inspected with Chrome's React Developer Tools. As shown, even when typing into the email input, you can see that the entire form is repeatedly re-rendering.

<img width="520" alt="스크린샷 2024-09-11 오후 7 32 53" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuOzNn%2FbtsJx1WfBvB%2FLgM8R9aoNDUSLM7Z3gzFc1%2Fimg.webp">

In the other hand, here is the login form re-created using Sicilian version 2.0.0. By utilizing SicilianProvider, getSicilianContext, and the ErrorState function that allows subscribing to only a portion of the overall state, you can see that only the Input component being typed into is re-rendered, rather than the entire form.

<img width="520" alt="스크린샷 2024-09-11 오후 7 32 53" src="https://img1.daumcdn.net/thumb/R1600x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0bspQ%2FbtsJy2AcCYS%2Fjgz5hx0kujNfirBgvxNWc0%2Fimg.webp">


# in App Router

In the Next.js App Router environment, Sicilian must be used with the **'use client'** directive. This is because the elements that make up Sicilian, such as **useSyncExternalStore and useContext**, all require the 'use client' directive. Other than this, the syntax can be used in the same way as before.

```tsx
'use client'
import { SicilianProvider } from "sicilian";
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
