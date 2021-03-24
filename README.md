# 📦 Box - Stage 6

![lint status](https://github.com/rishiosaur/box/workflows/lint/badge.svg)
![format status](https://github.com/rishiosaur/box/workflows/format/badge.svg)
![GitHub](https://img.shields.io/github/license/rishiosaur/box)
![GitHub issues](https://img.shields.io/github/issues/rishiosaur/box)
![GitHub contributors](https://img.shields.io/github/contributors/rishiosaur/box)
![GitHub last commit](https://img.shields.io/github/last-commit/rishiosaur/box)

A simple tutorial for implementing a React-like library. Uses `snabbdom` under the hood.

> This branch implements a fully featured TODO app in our React-like library.

## How to use this?

1. Clone the repository

```sh
git clone https://github.com/rishiosaur/box
```

2. Install the dependenices

```sh
yarn
```

3. Run the application

```sh
yarn start:dev
```

## Structure

| Branch                                   | Purpose                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| [main](z.rishi.cx/g/box/)                | Starting files to get to understand the codebase.               |
| [stage-1](z.rishi.cx/g/box/tree/stage-1) | Rendering our first components & inspecting the VDOM            |
| [stage-2](z.rishi.cx/g/box/tree/stage-2) | Support for functional components                               |
| [stage-3](z.rishi.cx/g/box/tree/stage-3) | Support for class components & a prototypal inheritance feature |
| [stage-4](z.rishi.cx/g/box/tree/stage-4) | Support for lifecycle hooks & adding state                      |
| [stage-5](z.rishi.cx/g/box/tree/stage-5) | Support for events & basic props                                |
| [stage-6](z.rishi.cx/g/box/tree/stage-6) | Building a basic Todo list app                                  |

### Navigating branches

Each branch represents a different stage in the project, and you can run `git checkout <branch name>` to switch to that branch's final commit. For instance, to check out what's going on in the 5th stage, you might run `git checkout stage-5` after cloning.

## License

MPL-2.0 © [Rishi Kothari](mailto:hey@rishi.cx)
