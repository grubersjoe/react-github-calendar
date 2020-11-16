# React GitHub Calendar

A React component to display a GitHub contributions graph based on SVG.

![Screenshot](preview.png#2)

[Demo and documentation](https://grubersjoe.github.io/react-github-calendar/)

Library size: 3 KB (minified and gzipped)

Supported browsers: Chrome, Firefox, Safari and Edge.

## Installation

```
yarn add react-github-calendar
```

## Development

Start watch mode for library first:

```
yarn
yarn start
```

Then start watch mode of example page:

```
cd example
yarn
yarn start
```

Open http://localhost:3000.

## Publish a new release

```
npm publish --dry-run

# When happy
npm publish --access=public
```

### Update demo page

```
yarn deploy
```
