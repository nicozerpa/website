---
title: How To Choose Which JavaScript Libraries To Use (Part 1)
id: 20210418
description: Choosing the right tools is crucial when starting a new JavaScript project. In this four-article series, I'll give you my tips and tactics to make the best choices.
published: 1
keywords: library selection, ecosystem, best practices
---

_Click here to read the other articles in this series: [Part 2](https://nicozerpa.com/how-to-choose-which-javascript-libraries-to-use-part-2/), [Part 3](https://nicozerpa.com/how-to-choose-which-javascript-libraries-to-use-part-3/), [Part 4](https://nicozerpa.com/how-to-choose-which-javascript-libraries-to-use-part-4/)._

So you want to create a JavaScript project? Great! Which library or framework are you going to use, React? Maybe Vue.js? Maybe you prefer using just Vanilla JS? Heck, even jQuery might be an option!

OK, let's say you choose React. Now, how will you do the state management? Redux, maybe MobX? Or maybe I rely just on React Hooks and the Context API?

**Choosing the right tools is one of the most important decisions that you'll have to make when you start a new JavaScript project.** These decisions have long-term consequences, good and bad, for your project. And they play a crucial role in the success (or failure) of it.

In this four-article series, I'll give you my tips and tactics so you can choose the best libraries for your JS project.


## Take Into Account Project Size

**In smaller projects, you should prefer tiny libraries** (or even Vanilla JS) with little boilerplate code. On the other hand, larger, more **complex libraries are better suited for larger projects** that might be worked on by many people.

One of the advantages of (some) complex libraries is that make the code easier to maintain (if you use them properly, of course.) at the cost of more boilerplate code, increased build times, and larger bundle sizes.

However, small codebases are easier to maintain. That means, if you add complex tools you'll get the disadvantages, but not the benefits (because you already had the benefit of maintainability.)

It doesn't necessarily mean that you should use only larger frameworks and libraries on big projects. Size still matters, and **if you find a smaller library that does the same thing and does it well, it can be a good option**, as long as they meet the other requirements in this series.

In the next article of this series, I'll talk about comparing new and shiny libraries vs. popular and "safer" ones, and when to choose one over the other. [Click here to read it](https://nicozerpa.com/how-to-choose-which-javascript-libraries-to-use-part-2/).