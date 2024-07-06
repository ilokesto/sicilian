# Sicilian

Sicilian is a form state management tool that operates based on global state. It supports TypeScript and can be used with Next.js and React.js.

In the frontend field, react-hook-form, a widely used form state management tool, operates based on refs. Because of this, you need to wrap components with forwardRef or use the useFormContext provided by the library. As a developer using Next.js, these limitations can be quite inconvenient.

Sicilian was developed to address these inconveniences by operating based on global state. This means Sicilian manages each input as state, helping you create forms using a controlled component approach. Additionally, since it is based on global state, you can call and use it from any component without the need for the context API or other global state management tools.

&nbsp;

# install and import

```ts
npm i sicilian
```
```ts
import { playDragon } from "Sicilian";
```

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
One notable point is that the event object uses a unique type, ***Input<"email">***, instead of the usual ChangeEvent<HTMLInputElement>. This is one of the custom types provided by Sicilian and is used to track which input the event originated from.

<img width="603" alt="image" src="https://github.com/ayden94/sicilian/assets/144667387/29e99343-f281-444b-9225-d52d2b3648b5">


### onBlur and onFocus
The onBlur handler is triggered when the input tag loses focus. It automatically validates the value of the input based on the handleValidate method and the validator object returned from it. If an issue is found during the validation process, the onBlur handler immediately stops execution and sends the error information to ErrorState. The onFocus handler, on the other hand, is triggered when the input tag gains focus. If there is an error for the input in the ErrorState, it removes that error.


&nbsp;


## handleValidate
Before we begin, it's important to clarify the definitions of two similar terms used in Sicilian. The ***validate object*** is used to validate a single input, while the ***validator object*** is a multidimensional object that groups these validate objects by their name field. The handleValidate method returns a validator object, and this validator object contains multiple validate objects that can be applied to each field. In type terms, it can be described as follows:
```ts
type Validator = Partial<Record<keyof initValue, Validate>>;
```
If desired, you can create validate objects and validator objects without handleValidate. However, using handleValidate provides the advantage of performing type checks internally, allowing you to write code in a more type-safe manner.

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
required?: true | {required: true, message: string}
 
minLength?: number | { number : number, message: string}
maxLength?: number | { number : number, message: string}
```
&nbsp;

For RegExp and customChecker, you can use either an object containing a message or an array of such objects. This allows you to validate the input value in multiple ways using more than one regular expression or validation function. Unlike the three fields discussed earlier, the message property for RegExp and customChecker fields is optional.
```ts
RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
RegExpErrorObj = { RegExp: RegExp; message?: string };
 
customChecker?: CustomCheckerErrorObj | Array<CustomCheckerErrorObj>;
CustomCheckerErrorObj = { checkFn: (value: string) => boolean; message?: string };
```
```ts
email : {
    RegExp: {
      RegExp: new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      message: "이메일 형식과 맞지 않습니다",
    },
  },
  
password: {
  RegExp: [
    {
      RegExp: new RegExp("^[A-Za-z0-9!@#$%^&*()_+{}|:<>?~-]+$"),
      message: "비밀번호는 공백을 포함할 수 없습니다.",
    },
    {
      RegExp: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]+$"),
      message: "비밀번호는 소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다",
    },
  ],
},
```
The checkFn used in customChecker takes the current value of the input and returns a boolean after running the validation logic. If the result is true, an error occurs; if false, no error occurs.
```ts
const badWordList = ["fuck", "suck", "shit"];
 
const isWordInclude = (wordList: string[]) => (value: string) => {
  for (const word of wordList) {
    if (value.includes(word)) return true;
  }
 
  return false;
};
 
nickname: {
  customChecker: { checkFn: isWordInclude(badWordList) },
},
```
Like the RegExp field, customChecker can accept an array of validation objects. Therefore, you can validate a value in multiple ways if needed, as shown below.
```ts
nickname: {
  customChecker: [
    {
      checkFn: isWordInclude(badWordList),
      message: "닉네임에 욕설을 포함할 수 없습니다",
    },
    {
      checkFn: isWordInclude(sexualWordList),
      message: "닉네임에 성적인 단어를 포함할 수 없습니다",
    },
  ]
},
```
One important point to note is that the onBlur handler validates fields in the order they are specified in the validate object. Additionally, if an error is found during validation, the process stops immediately.
In the first example, the minLength field is validated before the required field, making required effectively redundant since meeting minLength will naturally fulfill required. In contrast, in the second example, required first checks for the presence of a value, and then minLength checks the length of the value. If the validation result of an input is different from your expectations, you might have to check the order of the fields.
```ts
// required is meaningless
password: { minLength: 10, required: true }
 
// required is meaningfull
password: { required: true, minLength: 10 }
```

&nbsp;

## setValue
If you want to create a feature that allows users to fetch and edit a previously written review, you first need to retrieve the review data from the server and populate each input with this data. The setValue function provides the necessary functionality for this, and it should be used with useEffect to prevent infinite rendering.
```ts
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

&nbsp;

## FormState & ErrorState
The FormState function returns a formState object that stores the state of the inputs managed by formController. The ErrorState function returns an errorState object that contains error messages resulting from validation.

```ts
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

&nbsp;


## handleSubmit
The handleSubmit function takes a callback function as its argument. This callback function should operate asynchronously and receives the entire state of the form as its argument. This allows you to include necessary functions, such as fetch, within it. Internally, e.preventDefault() is handled, preventing redirection due to form submission.

```ts
<form
  onSubmit={handleSubmit(async (data) => {
    const res = await fetch("URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  })}
>
```
You can implement the submit logic yourself by accessing the formState object directly. However, using handleSubmit provides two significant advantages:

1. If there are any unresolved error messages, handleSubmit will stop the submission, preventing unwanted values from being sent to the backend.
2. Similarly, if all inputs managed by the formController are empty, handleSubmit will also stop the submission. This ensures that even if the user accidentally clicks the submit button, no unnecessary HTTP communication occurs.







