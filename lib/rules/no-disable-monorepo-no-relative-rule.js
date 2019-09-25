/**
 * @fileoverview Disallow disabling the no relative import rule outside of a package
 * @author no-disable-monorepo-no-relative-rule
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow disabling the no relative import rule outside of a package',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [],
  },

  create: function(context) {
    const disableRegex = /^eslint-disable(-next-line|-line)?\s+((@?[\w-]+\/([\w-]+\/)?)?[\w-]+)?/;

    const getEslintDisablePluginNamespace = value => {
      const match = disableRegex.exec(value);
      if (!match) {
        return null;
      }

      // match looks like:
      //[ 'eslint-disable-next-line react-native/no-inline-styles',
      //  '-next-line',
      //  'react-native/no-inline-styles',
      //  'react-native/']
      const [, , rule] = match;
      return rule;
    };

    return {
      Program: node => {
        for (const comment of node.comments) {
          const value = comment.value.trim();
          const rule = getEslintDisablePluginNamespace(value);

          if (rule && rule.includes('monorepo-cop')) {
            context.report({
              loc: {
                start: {
                  ...comment.loc.start,
                  column: -1,
                },
                end: comment.loc.end,
              },
              message: `You cannot disable the rule ${rule}`,
            });
          }
        }
      },
    };
  },
};
