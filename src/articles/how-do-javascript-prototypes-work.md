---
title: "How do JavaScript Prototypes Work?"
id: 20210926
description: 
published: false
tags: ["prototypes", "object", "classes", "beginners"]
includeInSimilar: true
---

Prototypes in JavaScript is a special topic. **You probably won't use them** because classes and some frameworks shield you from that. However, it's still important to know how they work it's a core part of the language. Knowing how prototypes work will also help you tackle weird bugs with those libraries or classes.

In JavaScript, you can use objects as "blueprints" to create new objects, and that makes the "blueprint" object a prototype.

**When you create an object with a prototype, the new object inherits all properties and methods from its prototype.** Let's see an example:
```javascript

// Let's create a regular object that
// we'll use as a prototype later
const dogProto = {
    eat: function() {
        console.log("This dog is eating");
    },
    bark: function() {
        console.log("This dog is barking");
    }
};

// Creating a new object using the prototype
const maxTheDog = Object.create(dogProto);

// `maxTheDog` has all the methods from its
// prototype, the `dogProto` object

maxTheDog.eat(); // Prints "This dog is eating"
maxTheDog.bark(); // Prints "This dog is barking"
```
In the previous paragraphs, I said the objects inherit the properties and methods from their prototype, but "inherit" isn't really the right word. **Prototype-based programming uses a technique called _delegation_.**

Delegation works like this: when you read the property of an object or call a method (e.g. `maxTheDog.eat()`), the JavaScript engine first searches for that property or method in the object itself. If the engine can't find it, it will search for it in the prototype. 

**Prototypes themselves can have prototypes too.** Therefore, if the JS engine couldn't find the property or method in the prototype, the search will continue in the prototype's prototype. And in the prototype's prototype's prototype. And in the prototype's prototype's... well you get the idea! 😉

Search will continue through the prototype chain until finding the property/method, or until there's nowhere else to search.

Let's see another example of this:
```javascript
// Creating a new object using the prototype
const maxTheDog = Object.create(dogProto);

// Creating a new method in `maxTheDog`
maxTheDog.sleep = function() {
    console.log("This dog is sleeping");
};

maxTheDog.sleep(); // Prints "This dog is eating"
maxTheDog.bark(); // Prints "This dog is barking"

```
<a name="fromNewsletter"></a>When we called `maxTheDog.sleep()`, the JS engine found it in the `maxTheDog` object itself. But when we called `maxTheDog.bark()`, the engine didn't find it in the object itself, it's not there. But the object has a prototype, and the engine found the method there.

**If you make changes to the prototype, it will also affect all the objects** created from it. For example:
```javascript
// Let's add a new method to the prototype
// we created before
dogProto.howl = function() {
    console.log("This dog is howling!");
};

// Now, the `maxTheDog` object can howl too
maxTheDog.howl(); // Prints "This dog is howling!"
```

## Constructor Functions
In all the previous examples, we used the `Object.create` method to create an object using prototypes. However, it's not the most common way to do it.

**Objects are generally created with a constructor function.** A constructor function is a regular function, there are only two things that make them special.

The first one is, you create an object by calling the function with the `new` keyword. And the second one is that inside the function, you can use the `this` keyword, which is a reference to the object being created.
```javascript
// Constructor function
function Cat(name) {
    this.name = name;
}
// Let's create a new object using the constructor
const tomTheCat = new Cat("Tom");
console.log(tomTheCat.name); // Prints "Tom"
```
But, where's the prototype? It's in the constructor function. In JavaScript functions are objects and they have a `prototype` property. If you use a function as a constructor, that property will be the prototype of the object you create.

So, in the example, the prototype of `tomTheCat` is `Cat.prototype`. We can see it through an example: when we add a new method to `Cat.prototype`, this method will also be available in the `tomTheCat` object:
```javascript
Cat.prototype.sayMeow = function() {
    // the "this" property refers to the object itself
    console.log(this.name + " says Meow!");
}
tomTheCat.sayMeow(); // Prints "Tom says Meow!"
```
## Classes as Syntactic Sugar
A couple of years ago, classes were added to JavaScript. It's important to know that **classes still use prototypes under the hood.** In fact, classes are a special kind of function and they have a `prototype` property too.

A JavaScript class is basically "syntactic sugar". That is, they're prototypes with a syntax that is easier to use for devs coming from other programming languages.
