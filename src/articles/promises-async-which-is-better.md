---
title: Promises or async/await, Which Is Better?
id: 20210704
description: 
published: 0
---
**Handling asynchronous tasks in JavaScript has always been a colossal pain in the neck.** Back in the day, developers had to deal with problems like callback hell and code that often became hard to read, scale, and maintain.

Nowadays, you have two very powerful tools that let us write asynchronous code: Promises and `async/await`. But, what's the difference, and when should you use one over the other?

First of all, it's important to point out that it's mostly a matter of opinion. Not everybody will agree with this, and that's OK.

In general, I'd recommend that you **use `async/await` as the preferred option**, and use Promises only on specific cases. But you should know how to use Promises anyway.

**The biggest pro of `async/await` is that it's generally easier to read**, it almost feels like you're writing regular synchronous code.

When you use promises, every function in the promise chain has its own scope. And that makes it tricky if you need to pass a variable from one method of the chain to another. Using `async/await` solves this problem because all the asynchronous tasks within the function all use the same scope.

```javascript
// Async/await version
(async function() {

    const customer = await axios(`https://someapi.co/getCustomerByEmail?email=nico%40nicozerpa.com`);
    const purchases = await axios(`https://someapi.co/getPurchasesByCustomerID/${customer.id}`);

    console.log(`${customer.data.fullName} has purchased ${purchases.data.length} times`);
})();

// Promises version
axios(`https://someapi.co/getCustomerByEmail?email=nico%40nicozerpa.com`)
.then(function (customer) {
    return Promise.all([
        customer,
        axios(`https://someapi.co/getPurchasesByCustomer/${customer.data.id}`)
    ]);
})
.then(function ([customer, purchases]) {
    console.log(`${customer.data.fullName} has purchased ${purchases.data.length} times`);
});
```
(Note: in the examples, I'm using [Axios](https://axios-http.com/), a library to make HTTP requests.)

See? The promises version becomes harder to read because it's not as straightforward to pass the variable `customer` from the first function in the chain to the second.

On the other hand, handling errors is generally easier when you use promises. That's because you can just add a `.catch()` method at the end of the chain. You can handle it with `async/await`, using the good ol' `try/catch`. 

Unfortunately, it's sightly more complex, but it means that **`async/await` ends up encouraging developers to avoid catching errors**, which is a bad practice.


You can avoid this problem by adding a call to `.catch()` on the `async` function if you're using `async/await`. That works because [asynchronous functions return promises](/im-using-async-await-why-does-my-function-return-a-promise). Let's see:

```javascript
async function printCustomerName() {
    const customer = await axios(`https://someapi.co/getCustomerByEmail?email=nico%40nicozerpa.com`);
    console.log(`The customer name is ${customer.data.fullName}`);
}

printCustomerName().catch(function(err) {
    console.error("An error occurred.");
})
```

Last but not least, that you can combine both approaches:
```javascript
(async function() {

    // Using promises and await at the same time, if you want to run two
    // async tasks at the same time, you can do it only with Promise.all
    const [customer, purchases] = await Promise.all([
        axios(`https://someapi.co/getCustomerByID/48`),
        axios(`https://someapi.co/getPurchasesByCustomerID/48`)
    ]);

    console.log(`${customer.data.fullName} has purchased ${purchases.data.length} times`);

})();


(async function() {

    // Using promises and await at the same time again:
    // In this case, the function to convert to JSON is simple
    // to just using Then.
    const customer = await fetch(`https://someapi.co/getCustomerByID/48`)
                            .then(response => response.json());

    console.log(`The customer name is ${customer.data.fullName}`);

})();
```

To recap, you should mostly use `async/await`, but in some cases, it's OK to use promises. 