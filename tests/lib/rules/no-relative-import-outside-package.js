/**
 * @fileoverview prevent relative imports above the nearest package.json
 * @author Wes Johnson
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const readPkgUp = require('read-pkg-up');
const sinon = require('sinon');
const rule = require('../../../lib/rules/no-relative-import-outside-package');
const RuleTester = require('eslint').RuleTester;

const errorMessage = (importPath, packageName) =>
  `import of "${importPath}" reaches outside of the package "${packageName}"`;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

/*
  simulated file structure:

  repo/
    package.json
    packages/
      my-package/
        package.json
        file.js
        more-files/
          file.js
      some-other-package/
        package.json
        file.js
*/

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
};

const invalidRelativeScenario = {
  code: "import something from '../some-other-package/file'",
  filename: '/Users/someone/repo/packages/my-package/file.js',
  parserOptions,
  errors: [
    {
      message: errorMessage('../some-other-package/file', 'my-package'),
      type: 'ImportDeclaration',
    },
  ],
};

const invalidNamedRelativeScenario = {
  code: "import { something } from '../some-other-package/file'",
  filename: '/Users/someone/repo/packages/my-package/file.js',
  parserOptions,
  errors: [
    {
      message: errorMessage('../some-other-package/file', 'my-package'),
      type: 'ImportDeclaration',
    },
  ],
};

const validRelativeScenario = {
  code: "import something from './more-files/file'",
  filename: '/Users/someone/repo/packages/my-package/file.js',
  parserOptions,
};

const validModuleScenario = {
  code: "import _ from 'lodash'",
  filename: '/Users/someone/repo/packages/my-package/file.js',
  parserOptions,
};

const validTypeScenario = {
  code: "import type { SomeType } from '../../some-other-package'",
  filename: '/Users/someone/repo/packages/my-package/file.js',
  parser: require.resolve('babel-eslint'),
};

const readPkgStub = sinon.stub(readPkgUp, 'sync');
readPkgStub.callsFake(({ cwd }) => {
  switch (cwd) {
    case invalidRelativeScenario.filename:
      return {
        path: '/Users/someone/repo/packages/my-package/package.json',
        package: { name: 'my-package' },
      };
  }
  throw new Error(`Unrecognized read-pkg-up call cwd: ${cwd}`);
});

const ruleTester = new RuleTester();
ruleTester.run('no-relative-import-outside-package', rule, {
  valid: [validModuleScenario, validRelativeScenario, validTypeScenario],

  invalid: [invalidRelativeScenario, invalidNamedRelativeScenario],
});
