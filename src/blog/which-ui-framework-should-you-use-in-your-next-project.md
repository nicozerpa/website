---
title: Which UI Framework Should You Use in Your Next Project?
id: 20210313
---

When creating a new front-end project, the question of choosing which framework to use always come to mind. Should I choose React or Vue.js? What about Angular? Is it still a good idea to use Vanilla JavaScript?

If the back-end does most of the business logic and you’ll make just a couple of small DOM manipulations, then you’re just fine going vanilla. If the front-end is simple enough, there’s no need to add extra bloat to your project.

But if the DOM changes become more complicated, Vanilla code can easily become a hot mess. When the front-end handles the business logic, then you need to use a UI framework with a state management pattern or library.

React is the absolute king of UI frameworks and in most cases, you can’t go wrong with it. But in most cases, React needs a build toolchain in order to work. That’s particularly true for its JSX syntax.

This is just fine for large applications, but if your project is small, it could be overkill.

And here’s when Vue.js enters the chat. This is also a UI framework and you can do the same things as React, but you don’t need a toolchain to use it. A simple `<script>` tag is more than enough to add Vue.js to your new project.

Vue.js scales well, and you can keep using it as your project grows larger.

The drawback is that, as Vue.js is not as popular as React, there are fewer libraries that work with it. Thankfully, the Vue.js team also provides libraries for URL routing (Vue Router) and state management (Vuex).

Angular is different than React and Vue.js because it’s does more than just UI. It’s a complete, very opinionated framework and it’s meant for large single page applications. It also has a steeper learning curve than React.

Angular relies on TypeScript, the superset of JavaScript that adds strict type checking to the language. Definitely, it’s for big projects.