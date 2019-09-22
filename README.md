# eslint-plugin-monorepo-cop

Rules to enforce good monorepo behaviours

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
    "plugins": [
        "monorepo-cop"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "monorepo-cop/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





