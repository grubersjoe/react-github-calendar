#!/usr/bin/env node

/* eslint-disable */
const fs = require('fs');
const path = require('path');

const parentPkgFile = String(
  fs.readFileSync(path.join(__dirname, '../package.json')),
);
const parentPkg = JSON.parse(parentPkgFile);

const pkgFile = String(fs.readFileSync(path.join(__dirname, './package.json')));
const pkg = JSON.parse(pkgFile);

pkg.version = parentPkg.version;

fs.writeFileSync(
  path.join(__dirname, './package.json'),
  JSON.stringify(pkg, null, 2) + '\n',
);
