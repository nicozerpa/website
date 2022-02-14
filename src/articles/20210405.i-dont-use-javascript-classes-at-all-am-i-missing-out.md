---
title: I Don't use JavaScript classes at all. Am I missing out on something?
id: 20210405
published: true
tags: ["classes", "this", "object-oriented programming", "functional programming", "javascript features"]
includeInSimilar: true
---
If you spend time reading about JavaScript and keeping up with the latest stuff online, you'll notice that many discussions revolve around classes. But if you don't use them, you might feel like you're "stuck in the old ways". **What are you missing out on if you don't use classes?**

Thankfully, **it's definitely possible to write correct, scalable code without classes**. There are very few instances in which classes are necessary.

Also, classes in JavaScript have a subtle difference from other languages like Java. This small difference can be confusing and introduce bugs that are hard to find. **And dealing with classes mean that you'll have to deal with the dreaded `this` keyword.**

Being a multi-paradigm language, JavaScript also works well with features from functional programming. You can:

**Compose functions**, calling a function, and pass the returned value to another function:
```javascript
functionA(functionB(value))
```

**Partially apply functions**, call a function with just some of the arguments. It returns a function that you can call with the remaining arguments:
```javascript
function flowerColour(flowerType, colour) {
  return `${flowerType} are ${colour}`
}

/* Call `flowerColour` partially, setting the 
  `flowerType` argument to "Roses" */
const rosesAre = flowerColour.bind(null, "Roses")

console.log(rosesAre("red")) // Returns "Roses are red"
```

**Use and create higher-order functions**, these are functions that take a function as an argument or returns a function:
```javascript

/* Map is a higher-order function, because
   it takes a function as an argument */

// Returns [10, 16, 37, 9]
[20, 32, 74, 18].map(number => number / 2)


/* Another higher-order function, in this
   case, it returns a function */
function createLuckyNumber(name) {
  const luckyNumber = parseInt(10000 * Math.random())
  return function() {
    return `${name}'s lucky number is ${luckyNumber}`
  }
}

const emmasLuckyNumber =  createLuckyNumber("Emma")
const joesLuckyNumber = createLuckyNumber("Joe")

// Returns "Emma's lucky number is 7280"
console.log(emmasLuckyNumber())

// Returns "Joe's lucky number is 2971"
console.log(joesLuckyNumber())
```

The last example created a **closure**. You create a closure when you create a function inside a function. This inner function has access to the variables from the parent function. The closure is the combination between the inner function and the variables from the parent.

For example, when you call `createLuckyNumber`, it reads the name, creates the lucky number, and returns an inner function. Even after `createLuckyNumber` was called, the inner function still can read the person's name and the number. **Closures are an alternative to private fields in classes.**

With these functional tools, you can also extend with libraries like Lodash, you are ready to write readable, performant and scalable code without classes.

## What Make Classes Tick

There's a situation in which I use classes and I think it's the best way to use them. **Classes are good when you want to isolate a complex task from the rest of the application.**

This kind of class is like a "black box". That's because the rest of the codebase doesn't know (and doesn't care) about how the object works internally.

**Most of its properties are private.** Some of them might be public, and these properties can't be changed from outside the object unless it's strictly necessary. That's because that could mess with the object's inner workings.

(Note that JS still doesn't support private members, in this case, I just don't access them from outside the class.)

You should avoid using setter methods unless strictly necessary because it's the same as changing the object's properties from the outside.

When you need some functionality from the object, you can call one of the public methods, which performs an operation and returns the desired value.

**The public methods consist of actions and operations that the object can do**. For example, in a `Car` class, having an `accelerate` method is better than, say, `setSpeed`.

But in the end, this is a way to manage internal state, because the private properties of an object are its state. For that reason, I don't use classes in projects with a state management library. **So even in this case, classes aren't really necessary.**