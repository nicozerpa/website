---
title: When should I use asynchronous code in JavaScript?
id: 20211205
description: 
tags: ["async", "best practices"]
published: false
includeInSimilar: true
---
If you were learning JavaScript for some time, I'm sure that you've heard about asynchronous code. Promises, callbacks, the `async` and `await` keywords, etc. But a question that often gets unanswered is, when should I even use asynchronicity?

The short answer is: **only if you have to use a function that is already asynchronous and you need the return value of that function.** 

For example, imagine that we have to create a function that receives the number of a Pokémon and returns its name, e.g. if you pass the number 25, it returns "Pikachu".

In this function, we'll call the [PokéAPI](https://pokeapi.co/) using the native [`fetch` function](https://developer.mozilla.org/en-US/docs/Web/API/fetch).

The thing is, `fetch` is an asynchronous function. And we need what this function returns because it's the response from the API. It means that the function we create should be asynchronous.

```javascript
"use strict"; // Enable strict mode

async function getPokemonName(pokemonNumber) {
    let pokeApiResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
    );
    pokeApiResponse = await pokeApiResponse.json();

    return pokeApiResponse.name;
}

const pokemon25 = await getPokemonName(25);
console.log(`Pokémon #25 is ${pokemon25}`);
// 👆 Prints "Pokémon #25 is pikachu"
```

**In some cases, however, you can choose whether to use synchronous or asynchronous functions** to perform the same task. This often happens in Node.js, where you can read and write files using synchronous functions or asynchronous ones. Which ones should I use?

If you're creating the back end of a website using Node.js (or Deno) or you're working on the front end, you should definitely use the async versions.

**Synchronous tasks block everything else.** It means that, if a task takes a lot of time in Node, other people won't be able to enter the website until that task finished. On the front end, the site will freeze while a synchronous task runs. That's why async works better in those cases.