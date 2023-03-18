# scratch-render-with-types

This is a fork of [scratch-render](https://github.com/LLK/scratch-render) to assist with writing typesafe extensions using [PRG's extension framework](https://github.com/mitmedialab/prg-extension-boilerplate). 

Typescript has a hard time extracting types from the `scratch-render` package, so this repo can help you get a better idea of the typescript signatures.

Declaration files are included in this repo inside of `dist/`, and you can regenerate them for yourself after cloning and installing like so:

```bash
# After cloning and installing, i.e.
git clone git@github.com:mitmedialab/scratch-render-with-types.git
cd scratch-render-with-types
npm install

# Have typescript generate the type declarations
npm run make:types
```

> **NOTE:** The types are currently _BROKEN_, meaning they do not represent valid typescript types. Some work will need to be done to refactor the `.js` code to fix this. 

Below is the original [scratch-render](https://github.com/LLK/scratch-render) README ...

## scratch-render
#### WebGL-based rendering engine for Scratch 3.0

[![CircleCI](https://circleci.com/gh/LLK/scratch-render/tree/develop.svg?style=shield&circle-token=310da166a745295d515b3b90f3bad10f23b84405)](https://circleci.com/gh/LLK/scratch-render?branch=develop)

[![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-render.svg)](https://greenkeeper.io/)

## Installation
```bash
npm install https://github.com/LLK/scratch-render.git
```

## Setup
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Scratch WebGL rendering demo</title>
    </head>

    <body>
        <canvas id="myStage"></canvas>
        <canvas id="myDebug"></canvas>
    </body>
</html>
```

```js
var canvas = document.getElementById('myStage');
var debug = document.getElementById('myDebug');

// Instantiate the renderer
var renderer = new require('scratch-render')(canvas);

// Connect to debug canvas
renderer.setDebugCanvas(debug);

// Start drawing
function drawStep() {
    renderer.draw();
    requestAnimationFrame(drawStep);
}
drawStep();

// Connect to worker (see "playground" example)
var worker = new Worker('worker.js');
renderer.connectWorker(worker);
```

## Standalone Build
```bash
npm run build
```

```html
<script src="/path/to/render.js"></script>
<script>
    var renderer = new window.RenderWebGLLocal();
    // do things
</script>
```

## Testing
```bash
npm test
```

## Donate
We provide [Scratch](https://scratch.mit.edu) free of charge, and want to keep it that way! Please consider making a [donation](https://secure.donationpay.org/scratchfoundation/) to support our continued engineering, design, community, and resource development efforts. Donations of any size are appreciated. Thank you!
