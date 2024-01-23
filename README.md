# Cosmic Data Stories Vue toolkit

This repository contains the basic components for constructing a Vue-based Cosmic Data Story using WorldWide Telescope. Included are a base data story component that integrates WorldWide Telescope, as well as several other general-purpose components that can be easily added to a data story.

## Installation

To install, simply run one of the following commands:
```
# If you're using NPM
npm i @cosmicds/vue-toolkit

# or if you're using Yarn
yarn add @cosmicds/vue-toolkit
```

## Development

If you're doing development work on these components, it will likely be useful to have an external sample project that imports a development version of this one. The easiest way to do this is probably to use [`npm-link`](https://docs.npmjs.com/cli/v10/commands/npm-link). For example:
```
cd <path-where-you-keep-this-repo>
npm link
cd <path-to-your-sample-repo>
npm link @cosmicds/vue-toolkit
```
