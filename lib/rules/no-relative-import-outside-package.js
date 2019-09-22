/**
 * @fileoverview prevent relative imports above the nearest package.json
 * @author Wes Johnson
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'prevent relative imports above the nearest package.json',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [],
  },

  create: function(context) {
    const readPkgUp = require('read-pkg-up');
    const path = require('path');
    const packagePaths = {};

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isExternal(name) {
      return isScoped(name) || isExternalModule(name);
    }

    const scopedRegExp = /^@[^/]+\/[^/]+/;
    function isScoped(name) {
      return scopedRegExp.test(name);
    }

    const externalModuleRegExp = /^\w/;
    function isExternalModule(name) {
      return externalModuleRegExp.test(name);
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration: function(node) {
        if (node.importKind === 'type') {
          return;
        }

        const importName = node.source.value;

        if (isExternal(importName)) {
          // skip external imports b/c they're not reaching into other monorepo packages
          return;
        }

        const importBase = path.dirname(importName);
        if (importBase === '.') {
          // skip imports relative to the current file b/c they're in our module
          return;
        }

        if (!/^\./.test(importBase)) {
          return;
        }

        const fileName = context.getFilename();
        const fileDir = path.dirname(fileName);
        const importDir = path.resolve(fileDir, importBase);

        const fileBasePath = path.dirname(fileName);

        if (!packagePaths[fileBasePath]) {
          const packageInfo = (packagePaths[fileBasePath] = {});

          // should only call this if the current filename path doesn't include a previously found package
          const nearestPkg = readPkgUp.sync({
            cwd: fileName,
            normalize: false,
          });

          packageInfo.path = path.dirname(nearestPkg.path);
          packageInfo.name = nearestPkg.package.name;
        }

        const packageInfo = packagePaths[fileBasePath];
        if (importDir.includes(packageInfo.path) === false) {
          context.report(
            node,
            `import of "${importName}" reaches outside of the package "${packageInfo.name}"`
          );
        }
      },
    };
  },
};
