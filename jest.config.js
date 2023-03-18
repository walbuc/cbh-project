// Run only for node and improve performance.
const path = require('path')

module.exports = {
  //jest-environment-node
  testEnvironment: 'node',
  roots: [path.join(__dirname, './src')],
  rootDir: path.join(__dirname),
}
