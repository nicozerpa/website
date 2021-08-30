---
title: I'm Using async/await. Why Does My Function Return a Promise?
id: 20210516
description: The async/await patterns make asynchronous tasks way easier, but it has some gotchas. How to solve them?
published: true
tags: ["async", "await", "language features", "gotchas"]
includeInSimilar: true
---
Handling asynchronous became way easier thanks to the `async`/`await` pattern. **It makes async tasks almost as straightforward as regular synchronous operations:**

```javascript
async function asyncCheckPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/25");
  const pikachuJSON = await response.json();

  // Prints "Look mum, no callbacks! Pokémon #25 is pikachu"
  console.log(
    `Look mum, no callbacks! ` +
    `Pokémon #${pikachuJSON.id} is ${pikachuJSON.name}`
  );
}
asyncCheckPokemon();
```

However, **there are still some gotchas you should take into account** when you have to deal with this pattern. The function in the previous example doesn't return anything, but it logs some text into the console. 

Now, let's make a small change so that the function returns the string instead of printing it:
```javascript
async function asyncCheckPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/25");
  const pikachuJSON = await response.json();

  return (
    `Look mum, no callbacks! ` +
    `Pokémon #${pikachuJSON.id} is ${pikachuJSON.name}`
  );
}

const pikachuMessage = asyncCheckPokemon();
```

What's the value of the variable `pikachuMessage`? If you said that it's the string "Look mum, no callbacks! Pokémon #25 is pikachu", that's wrong. The variable is a promise that resolves to that string. But, why?

The `async`/`await` pattern works like this: When you execute an asynchronous task using the `await` keyword, the function that contains the call should be "paused" until the asynchronous task is over.

The thing is, **you can't block the entire execution of your script because it also would block the event loop**, the task wouldn't really be asynchronous anymore.

This problem is solved by using promises. If the function that contains the asynchronous task returns a promise, the asynchronous operation will block just that function.

Now, how do you handle `async` functions that return values? **You should call it from another `async` function, and you should use `await` to make the call**. It should look like this:

```javascript
async function asyncCheckPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/25");
  const pikachuJSON = await response.json();

  return (
    `Look mum, no callbacks! ` +
    `Pokémon #${pikachuJSON.id} is ${pikachuJSON.name}`
  );
}

async function printPikachuMessage() {
    const pikachuMessage = await asyncCheckPokemon();

    // Prints "Look mum, no callbacks! Pokémon #25 is pikachu"
    console.log(pikachuMessage);
}

printPikachuMessage();
```

But, what if you want to call get the value from an `async` function at the top level (i.e. not inside a function)? In Node.js and Chrome, you can if the script is an ES6 module. In Node.js, make sure that the file extension is ".mjs" and for Chrome, add the `type="module"` attribute to the `<script>` tag.

But if you can't use modules, you'll have to use an `async` function that doesn't return anything, and then call that function at the top level. You can use an Immediately-Invoked Function Expression (IIFE) for this.