# Semantic UI, React, and TypeScript Examples

Several examples built with [Semantic UI](https://react.semantic-ui.com/), [React](https://facebook.github.io/react/), and [TypeScript](https://www.typescriptlang.org/).

Each example was created with [create-react-app](https://www.npmjs.com/package/create-react-app) and [react-scripts-ts](https://www.npmjs.com/package/react-scripts-ts) using the following command:

``` bash
create-react-app my-app --scripts-version=react-scripts-ts
```

For local development, run `npm start` in the root directory of any of these examples, and it will automatically start a server, launch the example in your browser, and watch for any changes that you make to the code. The page will reload with your changes automatically!

## [Fixed Header/Footer Layout](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/fixed-header-footer-layout/)

<img src="screenshots/fixed-header-footer-layout.png?raw=true" width="320">

Fixes a header to the top of the view port and a footer to the bottom, while the region in the middle can scroll. Semantic UI supports fixed menus on the top and bottom out of the box, but they require manually adding padding to the middle region to avoid overlap. By using [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes) for layout instead, that extra padding is not required.

* [Run Fixed Header/Footer Layout example](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/fixed-header-footer-layout/)

## [Magic 8-Ball Chat](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/magic-eight-ball-chat/)

<img src="screenshots/magic-eight-ball-chat.png?raw=true" width="320">

Ask a yes or no question to the magic 8-ball and it will give you an answer. Styled like a chat application with a list of messages. The messages have different styles, depending on the person who sent each one.

* [Run Magic 8-Ball Chat example](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/magic-eight-ball-chat/)

## [Loan Payment Calculator](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/loan-payment-calculator/)

<img src="screenshots/loan-payment-calculator.png?raw=true" width="320">

Change the the principal, the interest rate, and the number of years required to pay back the loan to calculate your monthly payment. Includes a custom NumericStepper component.

* [Run Loan Payment Calculator example](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/loan-payment-calculator/)

## [Todos](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/todos/)

<img src="screenshots/todos.png?raw=true" width="320">

Keep track of a list of things you need to do. Add items, check them when completed, and clear all completed items. Shows how to create a list that displays some simple data, along with how to add and remove items from the data provider.

* [Run Todos example](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/todos/)

## [Bottom Navigation with Router](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/bottom-navigation-with-router/)

<img src="screenshots/bottom-navigation-with-router.png?raw=true" width="320">

Navigate between views using navigation fixed to the bottom, powered by [React Router](https://reacttraining.com/react-router/).

* [Run Bottom Navigation with Router example](https://joshtynjala.github.io/semantic-ui-react-typescript-examples/bottom-navigation-with-router/)