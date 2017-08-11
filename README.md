# react-minscroll

## Installation

```
yarn add @xailabs/react-minscroll
```
```
npm install --save @xailabs/react-minscroll
```

## What is it?

A react wrapper component that only renders its children if the window is scrolled below a certain point.

That certain point may be one of these types:

- `number` - amount of pixels
- `string` - A css selector query that retrieves an `Element`
- `Element` - reference to a DOM node.
- `function` - A function that returns any of the previously mentioned types

You specify it using the `minScroll` prop.
If `minScroll` resolves to an element, it's bottom position will be used (`offsetTop + offsetHeight`). 
If you have dynamic heights, maybe in responsive environments, use functions that measure and return the current values.

## Example:

```
import React, {Component} from 'react';
import MinScroll from '@xailabs-minscroll';
export default class MyComponent {
    render() {
        return (
            <MinScroll minScroll={500}>
                I will only be visible when the window was scrolled 500 pixels!
            </MinScroll>
        );
    }
}

```

## Other props

- `offset` - Will be added to `minScroll`
- `offsetNegative` - Will be subtracted from `minScroll`

Both these props take the same types as `minScroll` (described above).

You might wonder why have a `offsetNegative` if you can just use `offset={-50}`. The reason for this is that you can only specify a negative number if the value actually is a number.  
Using offsetNegative you can specify a selector or use an `Element` reference and have its bottom subtracted from `minScroll`.

You can also combine the two, using `offset` for smaller corrections:

```
<MinScroll
    minScroll={'.AppHeader > div > .progress-container .ProgressBar'}
    offsetNegative={'.AppHeader .StickyHeader'}
    offset={-3}
    children={...}
/>

```