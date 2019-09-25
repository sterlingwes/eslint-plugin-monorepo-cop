/**
 * @fileoverview Disallow disabling the no relative import rule outside of a package
 * @author no-disable-monorepo-no-relative-rule
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-disable-monorepo-no-relative-rule');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
};

const message =
  'You cannot disable the rule monorepo-cop/no-relative-import-outside-package';

const invalidInlineDisableScenario = {
  code:
    "import something from '../some-other-package/file'; // eslint-disable-line monorepo-cop/no-relative-import-outside-package",
  parserOptions,
  errors: [{ message }],
};

const invalidGlobalDisable = {
  code: '/* eslint-disable monorepo-cop/no-relative-import-outside-package */',
  parserOptions,
  errors: [{ message }],
};

const invalidDisableNoDisableRule = {
  code:
    '/* eslint-disable monorepo-cop/no-disable-monorepo-no-relative-rule */',
  parserOptions,
  errors: [
    {
      message:
        'You cannot disable the rule monorepo-cop/no-disable-monorepo-no-relative-rule',
    },
  ],
};

const validInlineDisable = {
  code: 'eval(); // eslint-disable some-ok-rule',
};

const validInlineDisableAll = {
  code: 'eval(); // eslint-disable',
};

const ruleTester = new RuleTester();
ruleTester.linter.defineRules({
  'some-ok-rule': { create: () => ({}) },
  'monorepo-cop/no-relative-import-outside-package': require('../../../lib/rules/no-relative-import-outside-package'),
  'monorepo-cop/no-disable-monorepo-no-relative-rule': rule,
});

ruleTester.run('no-disable-monorepo-no-relative-rule', rule, {
  valid: [validInlineDisable, validInlineDisableAll],

  invalid: [
    invalidInlineDisableScenario,
    invalidDisableNoDisableRule,
    invalidGlobalDisable,
  ],
});
