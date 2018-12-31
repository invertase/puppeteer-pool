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

#### Options

- `validate`: A function to validate an instance prior to use, must return a promise that resolves `true` or `false`
- `puppeteerLaunchArgs`: Array of arguments to pass to `puppeteer.launch` when instances are created

**Options provided by [generic-pool](https://github.com/coopernurse/node-pool/blob/master/README.md#documentation):**
- `max`: maximum number of resources to create at any given time. (default=1)
- `min`: minimum number of resources to keep in pool at any given time. If this is set >= max, the pool will silently set the min to equal `max`. (default=0)
- `maxWaitingClients`: maximum number of queued requests allowed, additional `acquire` calls will be callback with an `err` in a future cycle of the event loop.
- `testOnBorrow`: `boolean`: should the pool validate resources before giving them to clients.
- `acquireTimeoutMillis`: max milliseconds an `acquire` call will wait for a resource before timing out. (default no limit), if supplied should non-zero positive integer.
- `fifo` : if true the oldest resources will be first to be allocated. If false the most recently released resources will be the first to be allocated. This in effect turns the pool's behaviour from a queue into a stack. `boolean`, (default true)
- `priorityRange`: int between 1 and x - if set, borrowers can specify their relative priority in the queue if no resources are available.
- `autostart`: boolean, should the pool start creating resources, initialize the evictor, etc once the constructor is called. If false, the pool can be started by calling `pool.start`, otherwise the first call to `acquire` will start the pool. (default true)
- `evictionRunIntervalMillis`: How often to run eviction checks. Default: 0 (does not run).
- `numTestsPerEvictionRun`: Number of resources to check each eviction run.  Default: 3.
- `softIdleTimeoutMillis`: amount of time an object may sit idle in the pool before it is eligible for eviction by the idle object evictor (if any), with the extra condition that at least "min idle" object instances remain in the pool. Default -1 (nothing can get evicted)
- `idleTimeoutMillis`: the minimum amount of time that an object may sit idle in the pool before it is eligible for eviction due to idle time. Supersedes `softIdleTimeoutMillis` Default: 30000
- `Promise`: Promise lib, a Promises/A+ implementation that the pool should use. Defaults to whatever `global.Promise` is (usually native promises).

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
