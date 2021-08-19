---
title: Understand Async/Await in 5 Minutes
id: 20210815
description: Understanding async in JavaScript is hard, getting your head around it takes a shift in thinking. Here, I'll make a quick explanation so that you can start using it.
published: 1
---
Understanding async in JavaScript is a common problem for many developers. **Getting your head around it takes a shift in thinking.** Here, I'll make a quick rundown of the most important concepts of asynchronous JavaScript so that you can start using it.

## First Things First, What's an Asynchronous Task?
Normally, tasks in JavaScript are run in a synchronous way. That is, it runs the instructions one by one, and **a given instruction won't be executed until the previous one has finished.**

Sometimes, that's problematic because if a task takes a lot of time, **the entire application gets blocked** until the time-consuming task finishes.

Asynchronous tasks help you solve this problem. **The time-consuming task will run, but it won't block the next instructions.** When the asynchronous task finishes, you'll be notified and you can do other things with the result of that task.

In JavaScript development, asynchronous tasks are typically functions that make connections to a server or handle files.

## What's a Promise?
Nowadays, asynchronous functions normally return a special kind of object called Promise. Promises have a `then` method, where you pass a function that will be executed when the promise is "fulfilled" (i.e. the asynchronous task has finished.)

The function you pass to the `then` method should have an argument. There, you'll receive the result of the asynchronous task.

```javascript
// Let's call the PokéApi web service to get information about Bulbasaur
const apiCallPromise = axios(`https://pokeapi.co/api/v2/pokemon/bulbasaur`);
console.log(`This message will appear before the 
API call from the previous line is over`);

apiCallPromise.then(function(responseFromServer) {
    console.log("This will run when the asynchronous task finishes");
    console.log(responseFromServer);
});
```

**Promises can be chained.** That means, if the function you passed in `.then` returns another asynchronous task, you can add another `.then` with a function for the second asynchronous task. 

```javascript
// Let's call the PokéApi web service to get information about Bulbasaur
const bulbasaurPromise = axios(`https://pokeapi.co/api/v2/pokemon/bulbasaur`);

bulbasaurPromise.then(function(bulbasaurResponse) {
    console.log(`First async task is over.
    We've got the info about Bulbasaur!`);

    // New call to PokéApi, not we'll ask about Magikarp
    return axios(`https://pokeapi.co/api/v2/pokemon/magikarp`);

}).then(function (magikarpResponse) {
    console.log(`Second async task is over.
    Now, we've got the info about Magikarp!`);
});
```

## Finally, What Are Async and Await?
The `async` keyword lets you create asynchronous functions. This kind of function [will always return a promise](/im-using-async-await-why-does-my-function-return-a-promise).

Also, inside `async` functions, you can use the `await` keyword. That keyword lets you "wait" for an asynchronous task to finish, without the need to use `then`. **It blocks the `async` function, but not the entire application.**

Let's see an example:

```javascript
async function askForPikachu() {
    const pikachuResponse = await axios(`https://pokeapi.co/api/v2/pokemon/magikarp`);
    console.log(`Async task is over.
    Now, we've got the info about Pikachu!`);
}
```

When you call an `async` function (or any function that returns a promise), that function will return immediately, unless you use `await`. But if you use that keyword, the function where you make the call should be `async` too.

Unless you're in a module, there you can use `await` when you're not inside a function.