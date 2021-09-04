# React GitHub Calendar

[![CI](https://github.com/grubersjoe/react-github-calendar/actions/workflows/test.yml/badge.svg)](https://github.com/grubersjoe/react-github-calendar/actions/workflows/test.yml)

A React component to display a GitHub contributions graph based on
[`react-activity-calendar`](https://github.com/grubersjoe/react-activity-calendar).

![Screenshot](preview.png?v3)

[Demo and documentation](https://grubersjoe.github.io/react-github-calendar/)

## Upgrade to v3

Please read the following how to upgrade from v2 to v3 and a list of breaking changes:

https://grubersjoe.github.io/react-github-calendar/#upgrade

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

# When you're happy
npm publish --access=public
```

### Update demo page

```
yarn deploy
```
