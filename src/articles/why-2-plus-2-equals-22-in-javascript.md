---
title: Why 2+2 equals 22 in JavaScript (and other gotchas that cause bugs)
id: 20210523
description: JavaScript has nuances that trip up developers, especially beginners. Here are some of the most common ones, and how to avoid them.
published: 0
---
JavaScript is a powerful language, but it has some nuances that might trip up developers, especially if you're a beginner. And some of them can cause bugs that could be hard to find. Here are some of the most common ones, and how to avoid them:

## When 2+2 equals 22
Let's imagine we have store the number 2 in local storage, and we retrieve it again to make some calculations:
```javascript
const firstNumber = localStorage.getItem("number"); // "2"
const secondNumber = 2;
console.log(firstNumber + secondNumber); // Outputs "22"
```
Yes, the sum now equals 22! Why is it that way? It's because when we got the data from the local storage, we got the number 2... as a string.

When you use the operator `+` and there's a string involved, JavaScript will consider that you are trying to concatenate (i.e. join) two strings. It will convert `secondNumber` to a string, and it will join the two strings together.

If you want to avoid this, you'll have to convert the string to a real number, using `parseInt` for integers, or `parseFloat` for numbers with decimals.

```javascript
const firstNumber = parseInt(localStorage.getItem("number")); // 2
const secondNumber = 2;
console.log(firstNumber + secondNumber); // Outputs 4
```
You have to do this if you're trying to get numbers from a source that also can contain strings. For example, `localStorage`, values of HTML attributes, text contents of HTML elements, or query strings.

## (Accidentally) Creating Variables Without Declaring Them
In JavaScript, it's possible to create variables without declaring them. That is, without using `var`, `const`, or `let`:
```javascript
const someNumber = 42; // I've created a variable declaring it
someOtherNumber = 547; // I've created a variable without declaring it
```
The problem is, that if you want to use a variable that you used before and you misspell the name, you can accidentally create new variables:
```javascript
function calculateAverage(...numbers) {
    let average = 0;

    for (let number of numbers) {
        average += number;
    }

    averag = average / numbers.length; // I misspelt "average"! 😱
    return average;
}
console.log(calculateAverage(8, 6, 10, 2, 54)); // Outputs 80
```
The average should be 16, but it returns 80 instead. Why? Because after the loop, I misspelt "average" and created a new variable, `averag` my mistake. Now, the real average is in that variable, the real `average` value contains the sum that we did through the loop.

How to solve it? The solution is to add the string `"use strict"` at the beginning of the file or the `<script>` block. That won't allow creating variables without declaring them, it will throw an error if you try to do that:

```javascript
"use strict";
function calculateAverage(...numbers) {
    let average = 0;

    for (let number of numbers) {
        average += number;
    }

    // It throws an error, "averag is not defined"
    averag = average / numbers.length;
    return average;
}
console.log(calculateAverage(8, 6, 10, 2, 54));
```

But take into account that, if you want to add it to already existing files or scripting blocks, verify first that all variables were properly declared using `const`, `let`, or at least `var`.

## Equality Operator
Every JavaScript developer knows that the `==` operator checks if the two variables or values are equal:
```javascript
const numberTen = 10;
const anotherNumberTen = 10;
console.log(numberTen == anotherNumberTen); // Outputs "true"
```
But if you want to use this operator with objects or arrays, it gets a little trickier:
```javascript
const someObject = { name: "Sonic", amimal: "Hedgehog" };
const someOtherObject = { name: "Sonic", amimal: "Hedgehog" };
console.log(someObject == someOtherObject); // Outputs "false"
```
Why? In JavaScript, the operator would return true if both variables refer to the same object. In this case, we have two different objects, they just happen to have the same properties.

If you'd like to compare two objects, the best way is to check the properties that you need. In this case, I'd do something like this:

```javascript
const someObject = { name: "Sonic", amimal: "Hedgehog" };
const someOtherObject = { name: "Sonic", amimal: "Hedgehog" };
console.log(someObject.name == someOtherObject.name); // Outputs "true"
```

## My Favourite One: Banana!
The last one won't cause any bugs to anyone, but I love it:
```javascript
console.log(("b" + "a" + + "a" + "a").toLowerCase());
// Outputs "banana"
```
What the heck happened here? First, it concatenates `"b"` with the first `"a"`, so we get `"ba"`. Now, there are two `+` signs and another `"a"`. Let's skip the first `+` for now, and let's jump to the `+ "a"` part.

It means "convert `"a"` to a positive number". But that letter is obviously not a valid number, so that expression returns `NaN`. The `+` sign we skipped before concatenates `"ba"` with `NaN` and we've got `"baNaN"`.

Finally, it concatenates that with the last `"a"` to get the string `"baNaNa"`, and it transforms it to lower case. _Voilà_, we got a banana from this weird expression.
