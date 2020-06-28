# React GitHub Calendar

A React component to display a GitHub contributions graph based on SVG.

![Screenshot](preview.png#2)

[Demo and documentation](https://grubersjoe.github.io/react-github-calendar/)

Library size: 3 KB (minified and gzipped)

Supported browsers: Chrome, Firefox and Safari.

## Development

Watch mode for library:

```
yarn
yarn start
```

Watch mode for demo page:

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

Update demo page:

```
yarn deploy
```
