/**
 * @fileoverview Rules to enforce good monorepo behaviours
 * @author Wes Johnson
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
  configs: {
    recommended: {
      rules: {
        'monorepo-cop/no-relative-import-outside-package': 'error',
        'monorepo-cop/no-disable-monorepo-no-relative-rule': 'error',
      },
    },
  },
  rules: requireIndex(__dirname + '/rules'),
};
