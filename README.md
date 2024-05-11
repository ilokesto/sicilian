# Caro-Kann

Caro-Kann is a TypeScript Library for managing 'global state' in React.js and Next.js.

If you looking for a very simple form of state-management solution, Caro-kann could be an option for you. Caro-Kann is simple to use, but has all the features we needs. You only need to know two hooks: playTartakower and useBoard.

# How to use

## install

`npm i caro-kann`

## import

`import { playTartakower } from "caro-kann";`

## create a store

playTartakower is a custom hook that creates a store that contains global states.

```ts
type Human = {
  name: string;
  age: number;
  canStand: boolean;
};

const useBoard = playTartakower<Human>({ name: "Caro-Kann", age: 28, canStand: true });
```

## use a store

useBoard is a custom hook that return `[board, setBoard]` tuple just like useState in React.js. board contains state, and you can update state use setBoard function.

```ts
const [board, setBoard] = useBoard<Human>();
```

## store with selector

Sometimes you don't need all the values ​​of a state, but only some property values. In this case, you can provide a selector function as the first argument to the useBoard function.
for example, If a component you create doesn't need to know value of name property, you can use useBoard and selector function just like a code below.

```ts
const [board, setBoard] = useBoard<number>((state) => state.age);
```

If values other than the age property value change, this will prevent the component from re-rendering.
