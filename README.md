# React GitHub Calendar

[![CI](https://github.com/grubersjoe/react-github-calendar/actions/workflows/test.yml/badge.svg)](https://github.com/grubersjoe/react-github-calendar/actions/workflows/test.yml)

A React component to display a GitHub contributions graph based on
[`react-activity-calendar`](https://github.com/grubersjoe/react-activity-calendar) and
[`github-contributions-api`](https://github.com/grubersjoe/github-contributions-api).

![Screenshot](preview.png?v3)

[Demo and documentation](https://grubersjoe.github.io/react-github-calendar/)

## Installation

```shell
npm install react-github-calendar
```

## Known issues

This component cannot be rendered on the server (SSR). Please refer to the
[known issues](https://github.com/grubersjoe/react-activity-calendar/blob/main/README.md#known-issues)
of `react-activity-calendar` for more details how to render it on the client only.

Create React App also is not supported. Again see the README.

## Development

Start watch mode for the library first:

```shell
npm install
npm dev
```

Then start watch mode of example page:

```shell
cd example
npm install
npm dev
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
