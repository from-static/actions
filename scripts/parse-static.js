module.exports = ({ state }) => {
  const fs = require('fs');
  const staticConfig = JSON.parse(fs.readFileSync('./static.json', 'utf8'));
  staticConfig._static = staticConfig._static || {};
  staticConfig._static.host = {
    ...state.host || {}
  };
  return staticConfig;
}