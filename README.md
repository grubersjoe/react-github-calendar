# React GitHub Calendar

[![CI](https://github.com/grubersjoe/react-github-calendar/actions/workflows/test.yml/badge.svg)](https://github.com/grubersjoe/react-github-calendar/actions/workflows/test.yml)

A React component to display a GitHub contributions graph based on
[`react-activity-calendar`](https://github.com/grubersjoe/react-activity-calendar).

![Screenshot](preview.png?v3)

[Demo and documentation](https://grubersjoe.github.io/react-github-calendar/)

## Installation

```shell
npm install react-github-calendar
```

## Development

Start watch mode for library first:

```shell
npm install
npm run dev
```

Then start watch mode of example page:

```shell
cd example
npm install
npm run dev
```

Open http://localhost:3000.

## Publish a new release

```shell
npm publish --dry-run

# When you're happy
npm publish --access=public
```

### Update demo page

```shell
npm run deploy
```
