---
title: Lodash or Underscore in 2021. Necessary or Obsolete?
id: 20210620
published: 0
description: JavaScript now has many of the utilities Lodash and Underscore used to offer. Are these still necessary, or Am I adding unnecessary bloat into my project?
---
If you have a couple of years as a developer, you've probably used either [Lodash](https://lodash.com/) or [Underscore.js](https://underscorejs.org/). These are two libraries that provide a bunch of utilities to manipulate data, particularly array and objects.

However, JavaScript now has many of the utilities these libraries offer. And now, the question is, are Lodash and Underscore still necessary? Or Am I adding unnecessary bloat into my project?

## What You Already Can Do Without Lodash or Underscore
This is a partial list of Lodash tasks that can now be replaced with vanilla JavaScript. If you use Lodash just for these utilities, you can replace with Vanilla and remove the dependency.

Concatenate arrays, without mutating the original array:
```javascript
let oneStooge = ["Moe"];
let twoStooges = ["Larry", "Curly"];

// Both create ["Moe", "Larry", "Curly"]
let threeStoogesLodash = _.concat(oneStooge, twoStooges);
let threeStoogesVanilla = [...oneStooge, ...twoStooges];
```

Fill part of an array with a single value (mutates the array):
```javascript
let someArray = [100, 99, 98, 97, 96, 95];
let someArrayCopy = [...someArray];
_.fill(someArray, 0, 2, 5); // [100, 99, 0, 0, 0, 95]
someArrayCopy.fill(0, 2, 5); // [100, 99, 0, 0, 0, 95]
```
Flatten an array:
```javascript
let sonicCharacters = [
    "Sonic",
    "Tails",
    "Knuckles",
    ["Amy Rose", "Shadow", "Dr. Eggman"]
];

// Both return:
// ["Sonic", "Tails", "Knuckles", "Amy Rose", "Shadow", "Dr. Eggman"]
let sonicCharactersFlatLodash = _.flatten(sonicCharacters);
let sonicCharactersFlatVanilla = sonicCharacters.flat();
```

Create a duplicate-free version of the array:
```javascript
let batmanLyrics = ["na", "na", "na", "na", "na", "Batman!"];

// Both return ["na", "Batman"]
let batmanLyricsUniqueLodash = _.uniq(batmanLyrics);
let batmanLyricsUniqueVanilla = [...new Set(batmanLyrics)];
```

Return an array with elements filtered out:
```javascript
let countries = [
    "United States", 
    "Belgium",
    "Japan",
    "China",
    "South Korea"
];

// Both return ["Japan", "China", "South Korea"]
let asianCountriesLodash = _.filter(
    countries,
    country => country != "United States" && country != "Belgium"
);
let asianCountriesVanilla = countries.filter(
    country => country != "United States" && country != "Belgium"
);
```

Check if an array includes a certain value:
```javascript
let frenchFlagColors = ["Blue", "White", "Red"];
// Both return false
let frenchFlagHasGreenLodash = _.include(frenchFlagColors, "Green");
let frenchFlagHasGreenVanilla = frenchFlagColors.include("Green");
```
## But Sometimes You Do Need Lodash or Underscore
Not every Lodash utility is available in Vanilla JavaScript. You can't deep clone an object, for example. That's why these libraries are far from obsolete. But if you're loading the entire library just to use a couple of methods, that's not the best way to use the library.

You can import just the functions you need. For example:
```javascript
// In ES6 module style:
import map from "lodash/map";
import cloneDeep from "lodash/cloneDeep";

// Or their CommonJS counterparts:
const map = require("lodash/map");
const cloneDeep = require("lodash/cloneDeep");
```

In fact, lodash has a NPM package for every utility. You can just install the functions you need, like this:
```
npm i lodash.clonedeep --save
```
However, if you decide to install specific utilities from lodash, you have to import them differently:
```javascript
// In ES6 module style:
import cloneDeep from "lodash.clonedeep";

// Or their CommonJS counterpart:
const cloneDeep = require("lodash.clonedeep");
```