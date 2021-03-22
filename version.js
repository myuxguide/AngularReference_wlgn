#!/usr/bin/env node

/**
 * Script which generates the environments/version.ts with the git revision hash.
 * Some of the values are pulled form the package.json like project name and version.
 *
 * @author Timothy Storm
 */
const {exec} = require('child_process');
const {writeFileSync} = require('fs');
const {resolve} = require('path');
const info = require('./package.json');

/**
 * fetch current git revision hash
 */
exec('git rev-parse --short HEAD', {
  cwd: __dirname
// }, (gitError, stdOut) => {
}, (gitError, gitOut) => {
  if (gitError) return (console.error || console.log).call(console, gitError.stack || gitError);
  else {
    // write the version environment file with the git hash
    let file = resolve(__dirname, 'src', 'environments', 'version.ts');

    // build version JSON - IMPORTANT this will publish
    let version = {
      name: info.name,
      version: info.version,
      description: info.description,
      hash: gitOut.toString().trim(),
      build: new Date().toISOString()
    };

    writeFileSync(file,
      `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT, COMMIT, or PUSH!
/* tslint:disable */
export const version = ${JSON.stringify(version, null, 2)};
/* tslint:enable */
`, {encoding: 'utf-8'});
  }
});
