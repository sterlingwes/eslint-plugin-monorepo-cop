# eslint-plugin-monorepo-cop

Rules to enforce good monorepo behaviours (mainly, no relative imports from other packages).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-monorepo-cop`:

```
$ npm install eslint-plugin-monorepo-cop --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-monorepo-cop` globally.

## Usage

Add `monorepo-cop` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["monorepo-cop"]
}
```

Then use our recommended ruleset:

```json
{
    "extends": {
        "plugin:monorepo-cop/recommended"
    }
}
```

## Supported Rules

- [no-relative-import-outside-package](./docs/rules/no-relative-import-outside-package.md)
- [no-disable-monorepo-no-relative-rule](./docs/rules/no-disable-monorepo-no-relative-rule.md)
