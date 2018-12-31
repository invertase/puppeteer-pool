<p align="center">
  <a href="https://invertase.io">
    <img src="https://static.invertase.io/assets/invertase-logo-small.png"><br/>
  </a>
  <h2 align="center">Puppeteer Pool</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@invertase/puppeteer-pool"><img src="https://img.shields.io/npm/dm/@invertase/puppeteer-pool.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/@invertase/puppeteer-pool"><img src="https://img.shields.io/npm/v/@invertase/puppeteer-pool.svg?style=flat-square" alt="NPM version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/@invertase/puppeteer-pool.svg?style=flat-square" alt="License"></a>
  <a href="https://discord.gg/C9aK28N"><img src="https://img.shields.io/discord/295953187817521152.svg?logo=discord&style=flat-square&colorA=7289da&label=discord" alt="Chat"></a>
  <a href="https://twitter.com/invertaseio"><img src="https://img.shields.io/twitter/follow/invertaseio.svg?style=social&label=Follow" alt="Follow on Twitter"></a>
</p>

----

[Puppeteer](https://github.com/GoogleChrome/puppeteer) [browser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser) instance pooling via [generic-pool](https://github.com/coopernurse/node-pool)

## Installation

```bash
# NPM:
npm i @invertase/puppeteer-pool
# YARN:
yarn add @invertase/puppeteer-pool
```

## Usage

### Import

```js
const createPuppeteerPool = require('@invertase/puppeteer-pool');
```

### Create a pool

```js
const pool = createPuppeteerPool({
  min: 2,
  max: 10,
  puppeteerLaunchArgs: [{ headless: false }],
});
```

### Acquire a [browser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser) instance

```js
const browserInstance = await pool.acquire();
```

### Release a [browser](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser) instance

```js
const browserInstance = await pool.acquire();
// do something with your instance,
// when you're finished with the instance; call release:
await pool.release(browserInstance);
```

### Drain and clear the pool

```js
await pool.drain();
await pool.clear();
```


## License

See [LICENSE](/LICENSE)
