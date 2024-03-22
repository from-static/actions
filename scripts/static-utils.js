// @ts-check

/**
* Parse a `static.json` file and return the JSON object.
* @param {object} env - Environment packages from the Github Action (i.e. core, github, context)
* @param {object} state - State from the Github Action (i.e. outputs)
*/
function parse({ core }, state = {}) {
 const fs = require('fs');
 let config = {};
 try {
   config = JSON.parse(fs.readFileSync('./static.json', 'utf8'));
 } catch (e) {
   core.setFailed(`Unable to parse static.json: ${e.message}`);
 }
 // Merge GitHub Action state with the parsed static.json
 config = {
  ...config,
   _static: {
    host: {
      ...state.host,
    },
    ...config._static,
   },
 }

 try {
   validate(config);
 } catch (e) {
   core.setFailed(`Invalid static.json: ${e.message}`);
 }
 return config;
}

/**
 * A basic validation function for the `static.json` file.
 */
function validate(config) {
  if (!config) {
    throw new Error('No configuration provided.');
  }
  if (!('_static' in config) || !config._static) {
    throw new Error('`_static` member not found in configuration.');
  }
  if (!config._static?.generator) {
    throw new Error('A `generator` is required in a `_static` configuration.');
  }
  if (config._static?.ecosystem && config._static?.ecosystem !== 'npm') {
    throw new Error('Unknown ecosystem provided. `npm` is currently the only official supported ecosystem.');
  }
  return true;
}

module.exports = {
  parse,
  validate,
}