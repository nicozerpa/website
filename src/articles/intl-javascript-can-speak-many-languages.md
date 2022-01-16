---
title: "The Intl object: JavaScript can speak many languages"
id: 20220116
description: "JavaScript has a useful yet unknown object to handle formatting dates, numbers, and other values in different languages, the `Intl` object. Find out how it works"
published: false
tags: ["javascript features", "l10n", "i18n"]
includeInSimilar: true
---
JavaScript has a useful yet unknown object to handle formatting dates, numbers, and other values in different languages, the `Intl` object.

This object is very useful when you have a raw date or a big number and you need to **display it in a more user-friendly way**.

You can, for example, convert the date `2022-01-16T20:10:48.142Z` to "January 16, 2022 at 8:10 PM" for people in the US, and to "16 de enero de 2022, 20:10" for those who live in Spain.

## Formatting numbers and currency
You can format numbers and currency with the `Intl.NumberFormat` object. This is how it works:
```javascript
const usaCurrencyFormatter = new Intl.NumberFormat(
  "en-US", // <-- Language and country
           // (in this case, US English)
  {
    style: "currency", // <-- it can also be
                       // "decimal", "percent"
                       // or "unit"

    currency: "USD"    // <-- Which currency to use
                       // (not needed if the style
                       // is not "currency")
  }
);

usaCurrencyFormatter.format(2349.56);
// ☝️ returns "$2,349.56"

const spainCurrencyFormatter = new Intl.NumberFormat(
  "es-ES",   // <!-- Spanish from Spain
  {
    style: "currency",
    currency: "EUR"    // <-- Euros
  }
);
spainCurrencyFormatter.format(2349.56);
// ☝️ returns "2349,56 €"

const qatarNumberFormatter = new Intl.NumberFormat(
  "ar-QA",   // <!-- Arabic from Qatar
  {
    style: "decimal"
  }
);
qatarNumberFormatter.format(4583290.458);
// ☝️ returns "٤٬٥٨٣٬٢٩٠٫٤٥٨"
```
When you're formatting currency, you have to specify the `currency` parameter with the code of the currency you want/need to use. [You can check a list of currency codes here](https://en.wikipedia.org/wiki/ISO_4217#Active_codes).


## Formatting dates
`Intl.DateTimeFormat` lets you format dates in different languages and locales:
```javascript
const date = new Date("2022-01-16T20:10:48.142Z");
const usaDateFormatter = new Intl.DateTimeFormat(
  "en-US", // US English
  {
    dateStyle: "short",  // <-- how to display the date
                         // ("short", "medium", or "long")
    
    timeStyle: "short", // <-- how to display the time
                        // if you don't include this parameter,
                        // it will just show the date

    timeZone: "America/Los_Angeles" // <-- this object also
                                    // converts time zones
  }
);

usaDateFormatter.format(date);
// ☝️ returns "1/16/22, 12:10 PM"

const brazilDateFormatter = new Intl.DateTimeFormat(
  "pt-BR", // Portuguese from Brazil
  {
    dateStyle: "long",
    timeStyle: "medium",
    timeZone: "UTC"
  }
);
brazilDateFormatter.format(date);
// ☝️ returns "16 de janeiro de 2022 20:10:48"

const japanDateFormatter = new Intl.DateTimeFormat(
  "ja", // Japanese
  {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Tokyo"
  }
);
japanDateFormatter.format(date);
// ☝️ returns "2022年1月17日 5:10"
```

However, these are only two of the many utilities in `Intl` to format other types of values into different languages. [On this page, there's the full list of formatters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

## Where to get languages and country codes?
Language codes consist of three parts *language*-*writingSystem*-*countryOrRegion*. Only the first part is necessary, and the writing system is necessary only if the language can be written in more than one alphabet/writing system.

Here are some examples:
```
en-US: English, United States
es: Spanish
pt-BR: Portuguese, Brazil
zh-Hans-CN: Chinese, simplified writing ("hans"), from China
```

The entire list of languages, countries or regions, and writing systems (or "scripts") [can be found here](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).
