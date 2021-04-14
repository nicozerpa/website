---
title: "JavaScript: Why Does `this` Work Like This?"
date: 20210411
published: 1
description: Many JS devs outright hate the keyword `this`. Learn how it works, so you can understand it.
---

"I hate this about JavaScript", "It creates so much confusion and so many bugs for zero gain.", "It's broken, Don't use it!" That's what many JavaScript devs think about the `this` keyword. **For many of them, `this` has definitely given them the most trouble with more complex apps.**

There are many articles out there about what the keyword means in different contexts, but now, I'd prefer to explain how `this` works, so that you can have a better understanding of it.

First of all, **let's remember that the JavaScript object system is based on prototypes.** What is a prototype? It's actually just an object that can be "inherited" by other objects. As prototypes are simple objects, they can have prototypes themselves.

When you try to access a property or method of a given object, first it searches the property on the object itself. If it can't find it, then it searches on the object's prototype. If it still can't find it, it searches on the prototype's prototype. And then, it keeps searching until the property is found. If it can't find the property anywhere, it's `undefined`.

Let's see an example:

```javascript
function DogThatQuacks(name) {
    this.name = name
}
DogThatQuacks.prototype.bark = function() {
    return `${this.name} says "Quack!"`
}

const bartholomew = new DogThatQuacks('Bartholomew')

// Outputs 'Bartholomew says "Quack!"'
bartholomew.bark() 
```

In the last line, the JavaScript engine first searches if the object `bartholomew` has a `bark` method. Since it hasn't (its only own property is `name`), then it looks into the prototype. It finds the method there, and finally executes `DogThatQuacks.prototype.bark`.

The thing is, the method `bark` exists in the object `DogThatQuacks.prototype`, not in `bartholomew`. How can the method access `bartholomew.name`? That's because **the value of `this` depends on how you call the function.**

You're eventually calling the method `DogThatQuacks.prototype.bark`, but you are calling it as a method of the object `bartholomew`. For that reason, `this` is a reference to `bartholomew` in this case. Now, let's play a little more with it:

```javascript
// Outputs 'undefined says "Quack!"'
DogThatQuacks.prototype.bark()

// Outputs 'undefined says "Quack!"', but
// it throws an error in strict mode
const bark = bartholomew.bark
bark()
```

In the first example, we're calling `DogThatQuacks.prototype.bark` directly! As you can guess, `this` is a reference to the prototype itself, which doesn't have the `name` property.

And in the second case, it will throw an error if you're using strict mode, and "undefined says Quack!" if not in strict mode. Why? because you're not calling `bark` as a method of an object, you're calling it as a simple function.

When you're calling functions in strict mode, `this` is not defined. And if the strict mode is not active, it references the global object. **Again, the value of `this` depends on how you call the function.**

More examples:
```javascript
function makeDogBark(barkMethod) {
    console.log(barkMethod())
}
// Outputs 'undefined says "Quack!"', but
// it throws an error in strict mode
makeDogBark(bartholomew.bark)


DogThatQuacks.prototype.actuallyBark = function() {
    const internalFunction = function() {
        return `${this.name} now says "Woof!"`
    }

    return internalFunction()
}

// Outputs 'undefined now says "Woof!"', but
// it throws an error in strict mode
bartholomew.actuallyBark()
```
In the first example, you're passing `bartholomew.bark` as an argument to the function `makeDogBark`. However, the function calls the argument `barkMethod`, that is, a simple function. 

In the second case, you're again calling the simple function `internalFunction`, so this is undefined or the global object, depending on whether strict mode is enabled or not.

**Also, you should consider that all of it also applies to classes.** That's why classes in JavaScript are just syntactic sugar for prototypes:
```javascript
class CatThatSaysMoo {
    constructor(name) {
        this.name = name
    }
    meow() {
        return `${this.name} says "Moo!"`
    }
}
const florence = new CatThatSaysMoo('Florence')

// Outputs 'Florence says "Moo!"'
florence.meow()

// Outputs 'undefined says "Moo!"'
CatThatSaysMoo.prototype.meow()

const meowFunction = florence.meow

// Throws an error, `this` is undefined
meowFunction()
```

If you have to pass a method as an argument to a function, or if you need to store the method in a variable, you can use arrow functions (which "inherits" the `this` from the parent scope) or the `bind` method:

```javascript
DogThatQuacks.prototype.actuallyBark = function() {
    const internalFunction = () => {
        // It inherits the `this` from
        // `DogThatQuacks.prototype.actuallyBark`
        return `${this.name} now says "Woof!"`
    }

    return internalFunction()
}

// Outputs 'Bartholomew now says "Woof!"'
bartholomew.actuallyBark()


// If fixes `this` as a reference
// to the object `florence`
const meowFunction = florence.meow.bind(florence)
// Outputs 'Florence says "Moo!"'
meowFunction()
```