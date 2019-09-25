# Prevent relative imports outside of monorepo package

AKA `no-relative-import-outside-package`

This rule exists to enforce package / workspace boundaries in a monorepo (a repo managed by something like yarn workspaces or lerna). Packages need to be isolated such that relative imports outside / above the nearest package.json don't happen.

## Fail

```
// package/my-package/index.js

import something from '../some-other-package/something.js'

const somethingRequired = require('../some-other-package/something.js')
```

## Pass

```
// package/my-package/index.js

import something from '@my-monorepo/some-other-package'

const somethingRequired = require('@my-monorepo/some-other-package')
```
