---
title: When to use `const` versus `let` versus `var` in JavaScript?
id: 20211024
description: "JavaScript has three ways to declare variables, but that leaves people confused. What's the difference, and which one should you use?"
published: true
tags: ["javascript features", "best practices", "var", "const", "let"]
includeInSimilar: true
---

JavaScript has three ways to declare variables, `var`, `const`, and `let`. Sometimes, that leaves people confused. You'll see many places where `const` and `let` are preferred, but other use `var`. What's the difference between one and the other, and which one should you use?

It's a matter of opinion, but I recommend that **you use `const` as your first option, and use `let` only when you know you'll have to reassign (i.e. change the value of) the variable at some point. And don't use `var` at all.**

**The idea is that using `const` prevents you from reassigning variables by mistake.** If you accidentally change the value of a variable that shouldn't be changed, you'll get the error immediately and you can fix it. However, if you use `let` or `var`, it would fail silently.

The only circumstance where I'd use `var` would be if I were working in a very old environment that doesn't support either `const` or `let`. Otherwise, I avoid using `var` altogether.

## Why you shouldn't use `var`

**Variables created with the `var` keyword are "function-scoped".** It means that if you declare that variable inside a function, it will be available within that function. And if you declare a variable outside a function, it will be a global variable (i.e. it will be available everywhere.)

Also, a variable created with `var` can be redeclared. It means that you can create the same variable again in the same scope.

Let's see an example of how it works:
```javascript
// Create a global variable
var multiplyBy = 2;

function createLuckyNumber() {
    
    // Create a variable inside a function.
    // The variable "multiplyBy" can be accessed here
    // because it's global
    var luckyNumber = 4927.52 * multiplyBy;
    return `Your lucky number is ${luckyNumber}`;
}
createLuckyNumber(); // Returns "Your lucky number is 9855.04"

// Redeclare the local variable.
var multiplyBy = 1;

createLuckyNumber(); // Returns "Your lucky number is 4926.52"

// This will throw an error, "luckyNumber"
// can't be accessed outside the function
// where it was created.
console.log(luckyNumber);
```

**However, this causes some problems especially for developers coming from other languages.** In many other languages, variables are "block-scoped", if they're declared inside a block, they can be accessed from that block only. But, what's a block?

A block is basically any group of statements inside curly brackets `{}`.

When you declare a block-scoped variable inside a function, it can be accessed from inside that function. If you declare it inside a loop (`for` or `while`), it's available inside that loop. And if you declare inside an `if...else` statement, it can be accessed from that part of the statement.

**If you're used to block-scoped variables and start to code in JavaScript, you could find many problems and create bugs using `var` and its function-scoped variables.**

Besides that, a good practice regarding variables is that they should be available only where they're needed, but that isn't always possible if you declare variables using `var`.

That led to the creation of two new ways to declare variables, `const` and `let`.

## Block scoping in JavaScript with `const` and `let`
The keywords `const` and `let` create block-scoped variables and **they fix the function-scoped problem that `var` has.** Let's see the differences between those and `var`:
```javascript

// These global variables can be accessed
// from anywhwere
var globalVar = "globalVar";
const globalConst = "globalConst";
let globalLet = "globalLet";

function doSomething(someParameter) {
    // The three variables can be accessed
    // from anywhere in the function.
    var fooVar = "fooVar";
    const fooConst = "fooConst";
    let fooLet = "fooLet";

    if (someParameter) {
        
        // This variable can be accessed
        // from anywhere in the function.
        var barVar = "barVar";

        // These two variables can be
        // accessed only from this block of
        // the "if" statement. 
        const barConst = "barConst";
        let barLet = "barLet";
    }

    console.log(barVar); // Outputs "barVar"

    console.log(barConst); // ❌ Throws Error
    console.log(barLet); // ❌ Throws Error
}
```

There's a difference between `const` and `let`, though. If you declare a variable using `const`, you can't reassign that variable using the `=` operator. 

```javascript
let firstName = "Daniel";
const lastName = "Teixeira";

firstName = "Sofia"; // It works
lastName = "Sampaio"; // ❌ Throws Error
```

It's worth pointing out that if you declare an object or an array (arrays are objects in JS) using `const`, you still can *mutate* it. It means that you can add, remove or modify properties or elements of that object.
```javascript
const names = ["Daniel", "Sofia"];

// It's a "const", you can't reassign the variable
names = ["Marianna", "Lucas"]; // ❌ Throws Error

// But you can mutate it
names[2] = "Marianna";
names[3] = "Lucas";

console.log(names); // Prints ["Daniel", "Sofia", "Marianna", "Lucas"]
```