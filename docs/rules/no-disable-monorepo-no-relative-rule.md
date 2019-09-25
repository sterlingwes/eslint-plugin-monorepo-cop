# Prevent disabling the no relative import rule

AKA `no-disable-monorepo-no-relative-rule`

This rule exists to prevent disabling any rules in this repo, because we're opinionated and we think this rule is important.

## Fail

```
import something from '../some-other-package/something.js' // eslint-disable monorepo-cop/no-relative-import-outside-package
```

## Pass

See pass exaple for [no-relative-import-outside-package](./no-relative-import-outside-package.md)
